import 'react-native-gesture-handler';
import React from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/MainTabNavigator';
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
  }

  render() {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    )
  }
}
