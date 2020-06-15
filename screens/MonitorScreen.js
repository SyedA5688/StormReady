import React from 'react';
import StackNavigator from '../navigation/StackNavigator'
import MonitorSystem from '../components/monitorSystem';
import * as firebase from 'firebase';


export default class MonitorScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    // Add listener for changes in authentication state
    firebase.auth().onAuthStateChanged(this.onAuthChange);
  }

  // Login authentication method
  onAuthChange = (user) => {
    this.setState({isAuthenticated: !!user});
  }
  
  render(){
    if (!this.state.isAuthenticated){
      // If not logged in yet, show stack navigator with login screens set
      return <StackNavigator />
    }
    else{
      // If logged in, return component for monitoring system
      return <MonitorSystem />
    }
  }
}