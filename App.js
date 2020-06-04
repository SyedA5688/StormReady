import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Header from './components/header';
import QOTD from './components/qotd';
import Home from './components/home';
import Plan from './components/plan';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Firebase
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';


function HomeScreen(){
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content} >
        <Home />
      </View>
    </View>
  );
}

function PlanScreen(){
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.content} >
          <Plan />
        </View>
      </ScrollView>
    </View>
  );
}

function QuestionsScreen(){
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content} >
        <QOTD />
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  
  constructor(props){
    super(props);

    // Initialize firebase
    if (!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  
  render() {
    return (
      <NavigationContainer>
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
          <Tab.Screen name="Questions" component={QuestionsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
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
  }
});
