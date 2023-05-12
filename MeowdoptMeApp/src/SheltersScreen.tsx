import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import map from './WebMap';

function SheltersScreen() {
  const [page, setPage] = useState('list');
  return page === 'list' ? (
    <View style={styles.sectionContainer}>
      <Text style={styles.text}>Shelters Screen</Text>
      <View style={styles.listContainer}>
        <Text style={styles.text}>SheltersList</Text>
      </View>
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            setPage('map');
          }}>
          <Text style={styles.buttonText}>Go to map</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <SafeAreaView style={styles.mapContainer}>
      <WebView source={{html: map}} />
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            setPage('list');
          }}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mapContainer: {
    flex: 1,
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'royalblue',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    maxHeight: 40,
    minWidth: 160,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
  map: {
    width: "100%",
    height: "100%",
  }

});

export default SheltersScreen;
