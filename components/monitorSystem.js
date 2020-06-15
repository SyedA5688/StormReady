import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, Vibration, Platform, ScrollView } from 'react-native';
import Header from './header';
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
      notification: {},
    };
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
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
    const localNotification = {
      title: 'Test Your Knowledge',
      body: 'Complete some questions to test your knowledge about hurricane preparedness!',
      sound: true,
      _displayInForeground: true,
    };
    let t = new Date(2020, 5, 15, 16, 0); // 2020, June (index months) 15th, 4:00pm
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
    this.setState({ notification: notification });
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
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync(); // Push token
      //console.log(token);
      //this.setState({ expoPushToken: token });
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

    // Post push token to firebase
    // Currently, any authenticated user can access database, make more secure later
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
              <Text style={styles.cardText} >To receive notifications, click on the button below</Text>
            </View>
            <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'skyblue'}]} onPress={this.onRegisterForNotificationsPress} >
              <Text style={styles.buttonText}>Register for notifications</Text>
            </TouchableOpacity>

            {/* Location tracking area */}
            <View>
              <Text>Location Tracking Area...</Text>
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
    width: '60%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});