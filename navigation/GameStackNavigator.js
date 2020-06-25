import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionsScreen from '../screens/QuestionsScreen';
import FactGameScreen from '../screens/games/HurricaneFactGame';
import PrepActionGameScreen from '../screens/games/PrepActionGame';
import MapMarkerGameScreen from '../screens/games/MapMarkerGame';

const Stack = createStackNavigator();

export default class GameStackNavigator extends React.Component{
  render(){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="StormReady"
          component={QuestionsScreen}
          options={{
            title: 'StormReady',
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              height: 90,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Storm Facts Quiz" 
          component={FactGameScreen} 
          options={{
            title: 'Storm Facts Quiz',
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              height: 90,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="Preparation Quiz"
          component={PrepActionGameScreen} 
          options={{
            title: 'Preparation Quiz',
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              height: 90,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="Map Quiz"
          component={MapMarkerGameScreen} 
          options={{
            title: 'Map Quiz',
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              height: 90,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    )
  }
}
