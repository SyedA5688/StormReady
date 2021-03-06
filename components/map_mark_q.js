import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import ApiKeys from '../constants/ApiKeys';


export default class MapMarkerQ extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      x: {
        latitude: 40,
        longitude: -100,
      },
      stormList: [],
    };
  }

  dragEndHandler = async (e) => {
    this.setState({ x: e.nativeEvent.coordinate });
    this.getStorms(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
  };

  getStorms = async (lat, long) => {
    // Requests all hurricanes and tropical storms in past 5 years that passed within 200 miles of coordinate, puts response into stormList
    const response = await fetch('https://api.aerisapi.com/tropicalcyclones/archive/closest?p=' + lat + ',' + long + 
    '&radius=200miles&from=-5years&to=now&limit=40' + '&client_id=' + ApiKeys.WeatherAPI.accessID + '&client_secret=' + ApiKeys.WeatherAPI.secretKey)
      .then(response => response.json()).then(data => {
        this.setState({ stormList: data.response.map(eachStorm => (
          {
            id: eachStorm.id,
            name: eachStorm.profile.maxStormType == "H" ? "Hurricane " + eachStorm.profile.name : "Tropical Storm " + eachStorm.profile.name,
            year: eachStorm.profile.year,
          }
        )) });
      });
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.infoBox} >
          <Text style={styles.titleText} >Explore Recent Hurricanes</Text>
          <Text style={styles.infoText} >
            Move the marker to any location where you would like to see some recent major
            hurricanes and tropical storms from the past 5 years. To move the marker, press
            and hold down on it
          </Text>
        </View>

        <MapView style={styles.mapStyle} >
          <Marker draggable
            coordinate={this.state.x}
            onDragEnd={(e) => this.dragEndHandler(e)}
          />
        </MapView>

        <View style={styles.responseContainer} >
          <Text style={{fontSize:22, textAlign: 'center'}} >Recent Major Storms:</Text>
          <Text style={{fontSize:15, textAlign: 'center', marginBottom: 5}} >(Listed in order of proximity to point)</Text>
          {this.state.stormList.map(stormData => {
            return (
              <View style={styles.indivResponseContainer} key={stormData.id + 'ViewComponent'} >
                <FontAwesome name="cloud" size={20} color="black" />
                <Text style={styles.responseText} key={stormData.id + 'TextComponent'} >
                  {stormData.name}, {stormData.year}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 3,
  },
  infoBox: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'antiquewhite',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width - 70,
    height: (Dimensions.get('window').height / 3),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  responseContainer: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'aliceblue',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  indivResponseContainer: {
    flexDirection: 'row',
    marginVertical: 3,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  responseText: {
    fontSize: 18,
    marginLeft: 10,
  },
});