import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Home(){
  return(
    <View style={styles.container} >
      <View style={[styles.cardContainer, { backgroundColor: 'lightsteelblue', borderWidth: 1, }]}>
        <Text style={styles.titleText} >General Information:</Text>
        <Text style={styles.generalText}>
          Hurricanes are dangerous storm systems characterized 
          by strong winds, heavy rain, and possible flood damage. This
          app is your hub for preparing for these severe storms before
          they happen
        </Text>
      </View>
      <View style={[styles.cardContainer, { backgroundColor: 'lightskyblue' }]} >
        <Text style={styles.cardText} >For information and helpful tips on how to prepare for severe storms, click on
                                          the <Text style={{fontWeight: 'bold'}} >Plan</Text> tab</Text>
      </View>
      <View style={[styles.cardContainer, { backgroundColor: 'lightpink' }]} >
        <Text style={styles.cardText} >To test your knowledge and decision making, answer some questions in
                                          the <Text style={{fontWeight: 'bold'}} >Questions</Text> tab</Text>
      </View>
      <View style={[styles.cardContainer, { backgroundColor: 'mediumaquamarine' }]} >
        <Text style={styles.cardText} >To get the most out of this app, check out the <Text style={{fontWeight: 'bold'}} >
                                      Monitor</Text> tab for push notifications and hurricane location monitoring</Text> 
      </View>

      <View style={styles.imageContainer} >
        <Image source={require('../assets/hurricane2.jpg')} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  cardContainer: {
    borderWidth: 0.5,
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
    fontSize: 17,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    //borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    height: 195,
    width: 300,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
  },
});