import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default class StackNavigator extends React.Component{
  render(){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'StormReady',
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              height: 90,
            },
            headerTitleStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{
            title: 'Signup',
            headerStyle: {
              backgroundColor: 'moccasin',
              height: 90,
            },
            headerTitleStyle: {
              color: 'saddlebrown',
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Forgot Password" 
          component={ForgotPasswordScreen} 
          options={{
            title: 'Forgot Password',
            headerStyle: {
              backgroundColor: 'moccasin',
              height: 90,
            },
            headerTitleStyle: {
              color: 'saddlebrown',
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    )
  }
}
