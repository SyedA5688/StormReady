import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import StackNavigator from '../navigation/StackNavigator'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as firebase from 'firebase';


export default class MonitorScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      expoPushToken: '',
      notification: {},
      isAuthenticated: false,
    };
    // Add listener for changes in authentication state
    firebase.auth().onAuthStateChanged(this.onAuthChange);
  }

  // Login authentication method
  onAuthChange = (user) => {
    this.setState({isAuthenticated: !!user});
  }

  // Temporary
  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  onRegisterForNotificationsPress = () => {
    this.registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while app is open. If the app was closed 
    // and then opened by tapping notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  registerForPushNotificationsAsync = async () => {
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
      console.log(token);
      //console.log('testing...');
      this.setState({ expoPushToken: token });
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

    // Post token to firebase so it can be retrieved later to send push notifications
    // Currently, any authenticated user can access database, make more secure later
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users").child(uid).update({
      expoPushToken: token
    });

    // To just store push token, no username or info
    /*firebase.database().ref("pushTokens").update({
      token
    });*/
    console.log('Called registerForPushNotifications()');
  };

  sendPushNotification = async () => {
    // Currently storing and retrieving token from state, later grab from firebase
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Test Your Situational Knowledge',
      body: 'Complete a daily question to test your knowledge about hurricane readiness!',
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
    console.log('Called sendPushNotification()');
  };
  
  render(){
    if (!this.state.isAuthenticated){
      return (
        /*<View style={styles.container}>
          <Header />
          <ScrollView>
            <View style={styles.content} >
              <MonitorInfo />
  
              <View style={styles.buttonContainer} >
                {(this.state.isAuthenticated) ? 
                <TouchableOpacity style={styles.buttonBox2} onPress={this.onLogoutPress} >
                  <Text style={styles.buttonText} >Logout</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.buttonBox1} onPress={this.onLoginPress} >
                  <Text style={styles.buttonText} >Login</Text>
                </TouchableOpacity>}
              </View>
            </View>
          </ScrollView>
        </View>*/

        <StackNavigator />   
      )
    }
    else{
      // Return component for tracking location
      return (
        <View style={{marginTop: 100, marginLeft: 20,}} >
          <Text>You are logged in!</Text>
          <Text>Control notifications and track location here</Text>
          <Button title="Register for notifications..." ></Button>
          <Button title="Signout" onPress={this.onSignoutPress} />
        </View>
      )
    }
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
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonBox1: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'mediumaquamarine',
    width: '70%',
    padding: 7,
    marginVertical: 15,
  },
  buttonBox2: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: '70%',
    padding: 7,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});