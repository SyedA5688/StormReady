import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';


export default class QuestionsScreen extends React.Component{
  onFactGamePress = () => {
    this.props.navigation.navigate("Storm Facts Quiz");
  }

  onPrepActionGamePress = () => {
    this.props.navigation.navigate("Preparation Quiz");
  }

  onMapMarkerGamePress = () => {
    this.props.navigation.navigate("Map Quiz");
  }

  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content} >
            <View style={styles.cardContainer} >
              <Text style={styles.cardText} >Test your knowledge and preparation with one of the quiz games below!</Text>
            </View>

            {/* Game navigation buttons */}
            <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'lightsteelblue'}]} onPress={this.onFactGamePress} >
              <Text style={styles.buttonText} >Go To Hurricane Facts Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'lightskyblue'}]} onPress={this.onPrepActionGamePress} >
              <Text style={styles.buttonText} >Go To Preparation Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'lightpink'}]} onPress={this.onMapMarkerGamePress} >
              <Text style={styles.buttonText} >Go To Map Marker Quiz</Text>
            </TouchableOpacity>
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
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: 'navajowhite',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});