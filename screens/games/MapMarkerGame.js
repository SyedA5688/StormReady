import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MapMarkerQ from '../../components/map_mark_q';


export default function MapMarkerGameScreen(){
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content} >
          <MapMarkerQ />
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