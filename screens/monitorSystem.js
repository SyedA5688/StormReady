import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, 
          Alert, Vibration, Platform, ScrollView, Dimensions } from 'react-native';
import Header from '../components/header';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys';


// This component will only show if user is logged in and authenticated
export default class MonitorSystem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //expoPushToken: '',
      //notification: {},
      userLocation: {
        latitude: 0,
        longitude: 0,
      },
      activeStorms: [],
    };
    this.updateStateLocation();
    this.getActiveHurricanes();
  }

  updateStateLocation = async () => {
    let user_id = firebase.auth().currentUser.uid;
    const response = await firebase.database().ref("users").child(user_id).child('location').once('value')
      .then((snapshot) => {
        // Update state with longitude and latitude retrieved from firebase, if user has location data in database
        if (snapshot.val() != null){
          this.setState({ userLocation: {
            latitude: parseFloat(snapshot.val().latitude),
            longitude: parseFloat(snapshot.val().longitude),
          } });
        }
      }, (error) => {
        console.log(error.message);
      })
  }

  getActiveHurricanes = async () => {
    // Retrieve active hurricane information from weather api
    const response = await fetch('https://api.aerisapi.com/tropicalcyclones/?' + 'client_id=' +
      ApiKeys.WeatherAPI.accessID + '&client_secret=' + ApiKeys.WeatherAPI.secretKey)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        // Set response array in state with all active hurricanes
        // Map function will extract from each storm an object containing:
        // The storm id (unique ID for key prop), 
        // The storm name, 
        // The storm category (TD = Tropical Depression, TS = tropical storm, 
        // H1...4 = Category 1...4 Hurricane, TY = Typhoon, STY = Super Typhoon),
        // The location object of the storm
        // The location track of the storm (oldest locations first in array)
        this.setState({ activeStorms: data.response.map(eachStorm => (
          // Will return this object for each storm in data.response
          {
            id: eachStorm.id,
            name: eachStorm.position.details.stormName,
            stormCat: eachStorm.position.details.stormCat,
            location: {
              latitude: eachStorm.position.loc.lat,
              longitude: eachStorm.position.loc.long,
            },
            track: eachStorm.track.map(trackInstance => ({
              dateTimeISO: trackInstance.dateTimeISO,
              location: {
                latitude: trackInstance.loc.lat,
                longitude: trackInstance.loc.long,
              },
              advisoryNum: trackInstance.details.advisoryNumber,
            }))
          }
        )) });
        //console.log(this.state.activeStorms);
      });
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  onRegisterLocationPress = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Was not able to set up location tracking, check if you have location disabled');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // Store rounded location in firebase
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users").child(uid).child("location").update({
      latitude: location.coords.latitude.toFixed(5),
      longitude: location.coords.longitude.toFixed(5)
    });

    // Update the location in state
    this.updateStateLocation();
  }

  onRegisterForNotificationsPress = () => {
    this.registerForPushNotificationsAsync()
    .then(() => {
      Alert.alert("Successfully signed up for push notifications!");
    }, (error) => {
      Alert.alert(error.message);
    });
    // Handle notifications that are received or selected while app is open
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    // Set up daily reminder to answer some questions
    Notifications.cancelAllScheduledNotificationsAsync(); // Clear other scheduled notifications
    const localNotification = {
      title: 'Test Your Knowledge',
      body: 'Complete some questions to test your knowledge about hurricane preparedness!',
      sound: true,
      _displayInForeground: true,
    };
    let t = new Date(); // Current date
    t.setDate(t.getDate() + 1);
    t.setHours(16, 0, 0); // Set time to 4pm the next day
    //console.log(t);
    const schedulingOptions = {
      time: t,
      repeat: 'day'
    };
    // On ios, automatically repeated notifications are deprecated because
    // iOS 10 deprecates UILocalNotification in iOS 10. Find another notification
    // framework*
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    //console.log(notification);
    //this.setState({ notification: notification });
    // Might need to pass navigation prop in from MonitorScreen
    this.props.navigation.navigate("Questions");
  };

  registerForPushNotificationsAsync = async () => {
    // Get push token, ask user permission if necessary
    let token = "";
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Did not set up notification services');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync(); // Push token
      //console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }

    // Post push token to firebase. Currently, any authenticated user can access database, make more secure later
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users").child(uid).update({
      expoPushToken: token
    });
  };

  sendPushNotification = async () => {
    let push_token = "";
    let user_id = firebase.auth().currentUser.uid;
    await firebase.database().ref("users").child(user_id).child('expoPushToken').once('value')
      .then((snapshot) => {
        push_token = snapshot.val();
      }, (error) => {
        Alert.alert(error.message);
      })

    const message = {
      to: push_token,
      sound: 'default',
      title: 'Test Your Knowledge',
      body: 'Complete some questions to test your knowledge about hurricane preparedness!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  cancelNotif = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  }
  
  render() {
    return (
      <View style={styles.container} >
        <Header />
        <ScrollView>
          <View style={styles.content} >
            {/* Location tracking area */}
            <View style={styles.locationContainer} >
              <View style={styles.mapTitleContainer} >
                <Text style={styles.mapTitleText} >Worldwide Storm View:</Text>
              </View>
              
              {/* Map */}
              <MapView 
                style={styles.mapStyle} 
                region={{ 
                  latitude: this.state.userLocation.latitude, 
                  longitude: this.state.userLocation.longitude, 
                  latitudeDelta: 25,
                  longitudeDelta: 25,
                }} 
              >
                {/* User Location Marker */}
                <Marker coordinate={this.state.userLocation} centerOffset={{ x: 0, y: -10 }}>
                  <Image source={require('../assets/location_marker.png')} style={{ width: 15, height: 25 }} />
                </Marker>

                {/* Markers for each active hurricane */}
                { this.state.activeStorms.map(stormData => {
                  return (
                    <View key={"ViewComponent-Storm:" + stormData.id} > 
                      {/* Storm marker */}
                      <Marker coordinate={stormData.location} title={stormData.name} key={stormData.id} >
                        <Image source={require('../assets/hurricane_icon.png')} style={{ width: 32, height: 30 }} />
                      </Marker>
                      {/* Dot marker for each position in track of each hurricane */}
                      { stormData.track.map(trackPosObj => {
                        let uniqueID = stormData.id + trackPosObj.dateTimeISO; // Key is the storm id and time of location
                        return (
                          <Marker coordinate={trackPosObj.location} key={uniqueID} >
                            <Image source={require('../assets/blue_dot_marker.png')} style={{ width: 8, height: 8 }} />
                          </Marker>)
                      })}
                      {/* Lines connecting track of storm */}
                      <Polyline 
                        coordinates={stormData.track.map(trackObj => (trackObj.location))}
                        key={"LinesComponent-" + stormData.id}
                        strokeColor="#000"
                        strokeWidth={3}
                      />
                    </View>
                  )
                })}
              </MapView>
            </View>

            <View style={styles.cardContainer} >
              <Text style={styles.cardText} >
                To receive notifications and register or update your location in our system, 
                use the buttons below
              </Text>
            </View>

            {/* Buttons */}
            <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'skyblue'}]} onPress={this.onRegisterForNotificationsPress} >
              <Text style={styles.buttonText}>Register for notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'lightgreen'}]} onPress={this.onRegisterLocationPress} >
              <Text style={styles.buttonText}>Update location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'lightpink', marginBottom: 30,}]} onPress={this.onSignoutPress} >
              <Text style={styles.buttonText}>Signout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  locationContainer: {
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  mapTitleContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    width: '90%',
    alignItems: 'center',
  },
  mapTitleText: {
    fontSize: 26,
    marginBottom: 2,
  },
  mapStyle: {
    width: Dimensions.get('window').width - 60,
    height: (Dimensions.get('window').height / 2 - 20),
    borderWidth: 1,
    borderRadius: 8,
  },
  cardContainer: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: Dimensions.get('window').width - 60,
    backgroundColor: 'seashell',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: '70%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});