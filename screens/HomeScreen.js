import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../components/header';
import Home from '../components/home';


export default class HomeScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.content} >
            <Home />
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
    paddingVertical: 40,
    paddingHorizontal: 35,
    flex: 1,
  }
});