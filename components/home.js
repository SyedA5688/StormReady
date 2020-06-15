import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Home(){
  return(
    <View style={styles.container} >
      <View style={[styles.cardContainer, { backgroundColor: 'lightsteelblue' }]}>
        <Text style={styles.titleText} >General Information:</Text>
        <Text style={styles.generalText} >Hurricanes are dangerous storm systems characterized 
                                    by fast winds, heavy rain, and flood damage. But the 
                                    most dangerous threat during hurricanes is unpreparedness!</Text>
      </View>
      <View style={[styles.cardContainer, { backgroundColor: 'lightskyblue' }]} >
        <Text style={styles.cardText} >For information on how to prepare for storms, click on
                                          the <Text style={{fontWeight: 'bold'}} >Plan</Text> tab</Text>
      </View>
      <View style={[styles.cardContainer, { backgroundColor: 'lightgreen' }]} >
        <Text style={styles.cardText} >To test how prepared and informed you are, click on
                                          the <Text style={{fontWeight: 'bold'}} >Questions</Text> tab</Text>
      </View>
      <View style={[styles.cardContainer, { backgroundColor: 'lightpink' }]} >
        <Text style={styles.cardText} >To get the most out of this app, check out the <Text style={{fontWeight: 'bold'}} >
                                      Monitor</Text> tab for push notifications and location monitoring</Text> 
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
  cardContainer: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
  },
  generalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    //borderWidth: 1,
    width: '100%',
    height: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    height: undefined,
    width: undefined,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey'
  },
});