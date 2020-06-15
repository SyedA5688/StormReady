import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function MonitorInfo(){
  return (
    <View>
      <View style={styles.topIconContainer} >
        <Ionicons name={'ios-notifications'} size={40} color={'cornflowerblue'} />
        <Text style={styles.topIconText} >Monitoring Your Area</Text>
      </View>
      <View style={styles.cardContainer} >
        <Text style={[styles.cardText2, {marginBottom: 3,}]} >This app has a system designed to:</Text>
        <Text style={styles.cardText} >
          (1) Monitor your general location for hurricane threats
        </Text>
        <Text style={styles.cardText} >
          (2) Send you daily reminders to answer a few questions about 
          severe storm events.
        </Text>
      </View>
      <View style={styles.cardContainer} >
        <Text style={styles.cardText2} >
          If a severe storm enters your area, you will receive more frequent
          reminders and warnings, with the aim of giving you more preparation 
          time and knowledge.
        </Text>
      </View>
      <View style={styles.cardContainer} >
        <Text style={styles.cardText2} >
          If you would like to use this system, log in or create an account below:
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  topIconContainer: {
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  topIconText: {
    marginLeft: 20,
    fontSize: 22,
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
    //textAlign: 'center',
  },
  cardText2: {
    fontSize: 16,
    textAlign: 'center',
  },
});