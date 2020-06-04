import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Home(){
  return(
    <View style={styles.container} >
      <View style={styles.homeCard} >
        <Text style={styles.homeCardText} >Stay informed and prepared for future hurricane events!</Text>
      </View>
      <View style={styles.imageContainer} >
        <Image source={require('../assets/hurricane.jpg')} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  homeCard: {
    borderWidth: 1,
    backgroundColor: 'lightcyan',
    borderRadius: 8,
    marginBottom: 10,
  },
  homeCardText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageContainer: {
    //borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    height: 213,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    height: undefined,
    width: undefined,
    //borderWidth: 1,
    borderRadius: 10,
  },
});