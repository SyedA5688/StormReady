import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, 
          Alert, Vibration, Platform, ScrollView, Dimensions } from 'react-native';
import Header from '../components/header';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as firebase from 'firebase';


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
    };
    this.updateStateLocation();
  }

  updateStateLocation = async () => {
    let user_id = firebase.auth().currentUser.uid;
    await firebase.database().ref("users").child(user_id).child('location').once('value')
      .then((snapshot) => {
        // Update state with longitude and latitude retrieved from firebase
        //console.log(snapshot.val());
        this.setState({ userLocation: {
          latitude: parseFloat(snapshot.val().latitude),
          longitude: parseFloat(snapshot.val().longitude),
        } });
      }, (error) => {
        console.log(error.message);
      })
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  onRegisterLocationPress = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Did not set up location tracking');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    //this.setState({ userLocation: location });
    // Store rounded location in firebase
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users").child(uid).child("location").update({
      latitude: location.coords.latitude.toFixed(5),
      longitude: location.coords.longitude.toFixed(5)
    });
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
    console.log(notification);
    //this.setState({ notification: notification });
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
  
  render() {
    return (
      <View style={styles.container} >
        <Header />
        <ScrollView>
          <View style={styles.content} >
            <View style={styles.cardContainer} >
              <Text style={styles.cardText} >
                This app will only take the information you allow it. Register 
                or update your location and notification device ID below</Text>
            </View>
            <TouchableOpacity 
              style={[styles.buttonBox, {backgroundColor: 'skyblue'}]} 
              onPress={this.onRegisterForNotificationsPress} 
            >
              <Text style={styles.buttonText}>Register for notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.buttonBox, {backgroundColor: 'lightgreen'}]} 
              onPress={this.onRegisterLocationPress} 
            >
              <Text style={styles.buttonText}>Update location</Text>
            </TouchableOpacity>

            {/* Location tracking area */}
            <View style={styles.locationContainer} >
              <Text>Latitude: {JSON.stringify(this.state.userLocation.latitude)}</Text>
              <Text>Longitude: {JSON.stringify(this.state.userLocation.longitude)}</Text>
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
                <Marker coordinate={this.state.userLocation} centerOffset={{ x: 0, y: -10 }}>
                  <Image source={require('../assets/location_marker.png')} style={{ width: 15, height: 25 }} />
                </Marker>
              </MapView>
            </View>
            
            {/* Signout Button */}
            <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'lightpink', marginTop: 40,}]} onPress={this.onSignoutPress} >
              <Text style={styles.buttonText}>Signout</Text>
            </TouchableOpacity>
            {/* <Button title="Send a notification to me" onPress={this.sendPushNotification} /> */}
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
    paddingVertical: 30,
    paddingHorizontal: 35,
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'seashell',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonBox: {
    borderWidth: 1,
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
  locationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width - 90,
    height: (Dimensions.get('window').height / 3) + 50,
    borderWidth: 1,
    borderRadius: 8,
  }
});