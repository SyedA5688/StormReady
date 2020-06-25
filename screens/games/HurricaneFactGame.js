import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import FactQOTD from '../../components/fact_qotd';


export default function FactGameScreen(){
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content} >
          <FactQOTD />
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