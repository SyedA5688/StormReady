import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PrepActionQOTD from '../../components/prep_action_qotd';


export default function PrepActionGameScreen(){
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content} >
          <PrepActionQOTD />
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