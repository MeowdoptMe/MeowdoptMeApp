import * as React from 'react';
import {useState, useContext} from 'react';
import {ScreenContext} from './Context';
import {View, Text, StyleSheet, Pressable} from 'react-native';

function SheltersScreen() {
  const [page, setPage] = useState(0);   // 0 to sheltersList, 1 - mapa
  return (
    page === 0 ?(
    <View style={styles.sectionContainer}>
      <Text style={styles.text}>Shelters Screen</Text>
        <View style={styles.listContainer}>
          <Text style={styles.text}>SheltersList</Text>
        </View>
        <View style={styles.button}>
          <Pressable 
            onPress={() => {
              setPage(1)
            }}>
            <Text style={styles.buttonText}>
              Go to map
            </Text>
          </Pressable>
        </View>
    </View>
    ) : (
      <View style={styles.sectionContainer}>
        <View style={styles.mapContainer}>
          <Text style={styles.text}>Mapka</Text>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              setPage(0)
            }}>
            <Text style={styles.buttonText}>
              Go back to SheltersList
            </Text>
          </Pressable>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listContainer:{
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mapContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
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

  }

});

export default SheltersScreen;
