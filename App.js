import 'react-native-gesture-handler';
import React from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/MainTabNavigator';
import StackNavigator from './navigation/StackNavigator';

// Firebase
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };
    // Initialize firebase
    if (!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    //firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  
  // Login authentication method
  /*onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }*/

  render() {
    return (
      <NavigationContainer>
        {/* If want to implement login system, uncomment code */}
        {/* {(this.state.isAuthenticated) ? <TabNavigator /> : <StackNavigator />} */}
        <TabNavigator />
      </NavigationContainer>
    )
  }
}
