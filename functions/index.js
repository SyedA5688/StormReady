const functions = require('firebase-functions');
const https = require('https');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Helper function to retrieve hurricane list and locations from weather API
getActiveHurricanes = async (arr) => {
  let str = '';
  https.get('https://api.aerisapi.com/tropicalcyclones/?' + 'client_id=' + functions.config().weatherapi.id + '&client_secret=' + functions.config().weatherapi.key, (res) => {
    res.on('data', (d) => {
      str += d; // str gathers the data from the GET request
    });
    res.on('end', () => {
      // str contains the entire response from the api
      let dataObj = JSON.parse(str);
      dataObj.response.forEach(eachStorm => {
        arr.push({
          id: eachStorm.id,
          name: eachStorm.position.details.stormName,
          stormCat: eachStorm.position.details.stormCat,
          location: {
            latitude: eachStorm.position.loc.lat,
            longitude: eachStorm.position.loc.long,
          }
        })
      });
    });
    res.on('error', (e) => {
      console.log("An error occured trying to retrieve hurricane location information");
    });
  }).end();
}

// Helper function to calculate and return distance between two coordinate points
calculateDistance = (userLocation, hurricaneLocation) => {
  const earthRadius = 3963; // In miles
  let latDiff = (hurricaneLocation.location.latitude - userLocation.location.latitude) * (Math.PI/180);
  let longDiff = (hurricaneLocation.location.longitude - userLocation.location.longitude) * (Math.PI/180);
  let latA = (userLocation.location.latitude) * (Math.PI/180);
  let latB = (hurricaneLocation.location.latitude) * (Math.PI/180);
  let num1 = Math.sin(latDiff/2) * Math.sin(latDiff/2) + Math.cos(latA) * Math.cos(latB) * Math.sin(longDiff/2) * Math.sin(longDiff/2); 
  let num2 = 2 * Math.atan2(Math.sqrt(num1), Math.sqrt(1-num1));
  return (earthRadius * num2); // Distance in miles
}

// Helper function to send a post request to Expo's push notification server
sendPushNotification = (userObj, distToNearestHurricane) => {
  let push_token = userObj.expoPushToken;
  let message;

  if (distToNearestHurricane > 1000) {
    message = {
      to: push_token, sound: 'default', title: 'Hurricane Location Status: Safe', 
      body: 'There are no active hurricanes within 1000 miles of your location. But you can still plan ahead!',
      data: { data: 'goes here' }, _displayInForeground: true,
    };
  }
  else if (distToNearestHurricane <= 1000 && distToNearestHurricane > 500) {
    message = {
      to: push_token, sound: 'default', title: 'Hurricane Location Status: Mild Warning', 
      body: 'There is an active hurricane' + distToNearestHurricane + 'miles from your location, stay alert to your local weather stations',
      data: { data: 'goes here' }, _displayInForeground: true,
    };
  }
  else {
    message = {
      to: push_token, sound: 'default', title: 'Hurricane Location Status: Warning', 
      body: 'There is an active hurricane' + distToNearestHurricane + 'miles from your location. Prepare evacuation and shelter plans now!',
      data: { data: 'goes here' }, _displayInForeground: true,
    };
  }

  const options = {
    hostname: 'exp.host',
    port: 443,
    path: '/--/api/v2/push/send',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
  };

  const request = https.request(options, (response) => {
    response.on('error', (e) => {
      console.log("Error occured trying to send push notification");
    });
  });
  request.write(JSON.stringify(message)); // Writes the message data to the ClientRequest instance
  request.end();
};


// Firebase scheduled cloud function, runs once a day at 10:00 AM Central Time
exports.scheduledStormProximityNotification = functions.pubsub.schedule('0 10 * * *')
  .timeZone('America/Chicago')
  .onRun(async (context) => {
    // Retrieve hurricanes from API, adds the objects to hurricanelist
    let hurricaneList = [];
    const response = getActiveHurricanes(hurricaneList);

    // Retrieve users from database, puts the user objects into userList
    let userList = [];
    await admin.database().ref('users').once('value', snapshot => {
      let dataList = Object.values(snapshot.val());
      dataList.forEach(eachUser => {
        userList.push(eachUser);
      });
    }, (error) => {
      console.log("Database read failed: " + error.code);
    });

    // For each user, calculate distances to each hurricane and send according notification
    for (let i = 0; i < userList.length; i++) {
      let distToStorms = []; // List of the users distance to each active hurricane
      for (let j = 0; j < hurricaneList.length; j++){
        distToStorms.push(calculateDistance(userList[i], hurricaneList[j]));
      }

      if (distToStorms.length == 0) {
        // There are no active hurricanes, no need to send notification
        return null;
      } else {
        let nearestDist = Math.min(...distToStorms);
        sendPushNotification(userList[i], nearestDist);
      }
    }

    return null;
  });

