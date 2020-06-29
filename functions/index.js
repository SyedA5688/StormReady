const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.scheduledStormProximityNotification = functions.pubsub.schedule('0 10 * * *')
  .timeZone('America/Chicago')
  .onRun((context) => {
    // Put function code in here
    const data = admin.database.ref('/users/').once('value')
    .then(snapshot => {
      
    })


    return null;
  });

// ***Log in using command "firebase login" before deploying function
