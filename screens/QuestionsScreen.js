import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../components/header';
import QOTD from '../components/qotd';


export default function QuestionsScreen(){
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.content} >
          <QOTD />
        </View>
      </ScrollView>
    </View>
  );
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
  }
});