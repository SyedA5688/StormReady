import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Header from '../components/header';
import Plan from '../components/plan';


export default function PlanScreen(){
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.content} >
          <Plan />
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