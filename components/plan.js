import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Plan(){
  return(
    <View style={styles.container} >
      <View style={styles.imageContainer} >
        <Image source={require('../assets/planning.jpg')} style={styles.image} />
      </View>

      {/* Preparation Tips */}
      <View style={styles.titleTextContainer} >
        <Text style={styles.titleText} >Start Preparing Now:</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Know the nearest location you can reliably evacuate to for high ground and shelter</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Have enough food and bottled water to last you and your family at least 3 days until you are rescued</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >In a possible evacuation scenario, know ahead of time what essential items and documents you would need to bring from your house (birth cirtificates, government documents, personal items)</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Go over the evacuation plan with your family, time is precious during severe weather events</Text>
      </View>

      {/* Items to buy in advance tips */}
      <View style={styles.titleTextContainer} >
        <Text style={styles.titleText} >Items to Buy in Advance:</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >A battery or crank powered radio</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >A flashlight and some candles for light</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Bottled water and canned food</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >A first aid kit</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >A gas can to hold gasoline</Text>
      </View>

      {/* During the event Tips */}
      <View style={styles.titleTextContainer} >
        <Text style={styles.titleText} >During the Event:</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Heed local warnings! If you live in a high-risk area and you are advised to evacuate early, do not wait to see if you can ride out the storm</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >If you are sheltering within your home, stay in a room with no windows or openings that may collapse</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Listen to local news and radio stations broadcasting weather conditions and alerts</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Keep a radio, flashlight, and candles nearby incase your home loses power</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Do not consume tap water unless local guidance has said that the local water supply is uncontaminated</Text>
      </View>
      <View style={styles.tipContainer} >
        <Ionicons name={'ios-arrow-dropright'} size={35} color={'cornflowerblue'} />
        <Text style={styles.tipText} >Avoid crossing water patches, moving water can easily sweep you off your feet, and water patches can be deeper than they appear</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
  },
  imageContainer: {
    //borderWidth: 1,
    marginBottom: 5,
    alignSelf: 'center',
  },
  image: {
    width: 320,
    height: 213,
    borderRadius: 8,
  },
  titleTextContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 22,
    padding: 5,
  },
  tipContainer: {
    flexDirection: 'row',
  },
  tipText: {
    marginVertical: 6,
    marginHorizontal: 8,
    fontSize: 16,
    width: '90%'
  },
});