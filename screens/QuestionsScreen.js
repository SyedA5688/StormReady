import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';


export default class QuestionsScreen extends React.Component{
  onFactGamePress = () => {
    this.props.navigation.navigate("Storm Facts Quiz");
  }

  onPrepActionGamePress = () => {
    this.props.navigation.navigate("Preparation Quiz");
  }

  onMapMarkerGamePress = () => {
    this.props.navigation.navigate("Map Marker");
  }

  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content} >
            <View style={styles.cardContainer} >
              <Text style={styles.cardText} >Test your knowledge and decision making with one of the quiz games below!</Text>
            </View>

            {/* Game navigation buttons */}
            <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'whitesmoke'}]} onPress={this.onFactGamePress} >
              <Text style={styles.buttonText} >Hurricane Facts Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'whitesmoke'}]} onPress={this.onPrepActionGamePress} >
              <Text style={styles.buttonText} >Preparation Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'whitesmoke'}]} onPress={this.onMapMarkerGamePress} >
              <Text style={styles.buttonText} >Map Marker</Text>
            </TouchableOpacity>

            {/* Some Description */}
            <View style={styles.descriptionContainer} >
              <View style={styles.descTextContainer} >
                <Text style={styles.descText} >Make Sure to Develop Your:</Text>
              </View>
              <View style={styles.descComponent} >
                <AntDesign name={'book'} size={37} color={'black'} />
                <Text style={styles.descComponentText} >Understanding of hurricane formation and structure</Text>
              </View>
              <View style={styles.descComponent} >
                <FontAwesome5 name={'list-alt'} size={34} color={'black'} />
                <Text style={styles.descComponentText} >Plan for what to do before and during the event</Text>
              </View>
              <View style={styles.descComponent} >
                <FontAwesome5 name={'map-marker-alt'} size={35} color={'black'} />
                <Text style={styles.descComponentText} >Knowledge of nearby evacuation routes</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
    alignItems: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    width: '100%',
    backgroundColor: 'lavender',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 10,
    width: '90%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  descTextContainer: {
    borderBottomWidth: 1,
    width: '95%',
  },
  descText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 3,
  },
  descComponent: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 30,
  },
  descComponentText: {
    fontSize: 18,
    marginLeft: 15,
  }
});