import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function MonitorInfo(){
  return (
    <View style={styles.container} >
      <View style={styles.topIconContainer} >
        <Ionicons name={'ios-notifications'} size={40} color={'cornflowerblue'} />
        <Text style={styles.topIconText} >Monitoring Your Area</Text>
      </View>
      <View style={styles.cardContainer} >
        <Text style={[styles.cardText, {marginBottom: 3}]} >This app has a system designed to:</Text>
        <Text style={styles.cardText} >
          (1) Monitor your location in relation to active hurricanes
        </Text>
        <Text style={styles.cardText} >
          (2) Send you notifications about storm locations and reminders to answer quiz questions
        </Text>
      </View>
      <View style={styles.cardContainer} >
        <Text style={styles.cardText} >
          If a hurricane system enters your region, you will receive warnings about your proximity to the storm, giving 
          you a good timeframe to prepare.
        </Text>
      </View>
      <View style={styles.cardContainer} >
        <Text style={styles.cardText} >
          If you would like to use this system, log in or create an account below:
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  topIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '95%',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  topIconText: {
    marginLeft: 20,
    fontSize: 25,
  },
  cardContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'seashell',
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: '95%',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
});