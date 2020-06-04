import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
  return(
    <View style={styles.header} >
      <Text style={styles.title} >StormReady</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    backgroundColor: 'cornflowerblue',
    paddingTop: 45,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  }
});