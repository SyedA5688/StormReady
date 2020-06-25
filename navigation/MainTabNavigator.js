import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Screens - Import screen returning functions for tab navigator to call
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import GameStackNavigator from './GameStackNavigator';
import MonitorScreen from '../screens/MonitorScreen';


const Tab = createBottomTabNavigator();

export default class TabNavigator extends React.Component{
  render(){
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === "Home"){
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }
            else if (route.name === "Plan"){
              iconName = focused ? 'ios-checkbox' : 'ios-checkbox-outline';
            }
            else if (route.name === "Questions"){
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === "Monitor"){
              iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Questions" component={GameStackNavigator} />
        <Tab.Screen name="Monitor" component={MonitorScreen} />
      </Tab.Navigator>
    )
  }
}