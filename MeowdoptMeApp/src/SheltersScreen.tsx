import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import map from './WebMap';
import axios, { isAxiosError } from 'axios';
import { FlashList } from '@shopify/flash-list';
import { getShelters } from './shelterUtils';
import colorPalette from '../assets/colors';
import AdsPage from './AdsPage';
import { ShelterContext } from './Context';
import HomeScreen from './HomeScreen';


const { width, height } = Dimensions.get('window');



// @ts-expect-error
function SheltersScreen({ navigation }) {

  const [page, setPage] = useState('list');
  const [shelters, setShelters] = useState<any[]>([])
  const { shelter, setShelter } = useContext(ShelterContext);


  async function loadShelters() {
    try {
      const shelters = await getShelters();
      console.log(shelters);
      setShelters(shelters);
    } catch (e) {
      console.log(e)
    }
  }

  function onPressOut(shelter: string) {
    setShelter(shelter)
    navigation.navigate(HomeScreen);
  }



  useEffect(() => {
    loadShelters();
  }, [])



  return page === 'list' ? (
    <View style={styles.sectionContainer}>

      <FlashList
        data={shelters}
        estimatedItemSize={60}
        ListHeaderComponent={<Text style={{
          color: 'black',
          fontSize: 30,
          fontWeight: 'bold',
        }}>Schroniska</Text>}
        renderItem={({ item }) => (<View style={styles.listElement}>
          <Pressable
            onPressOut={() => {
              onPressOut(item.id)
              console.log(item.name)
            }}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.text}>{item.location}</Text>
          </Pressable>
        </View>)}
      />

      <View style={styles.button}>
        <Pressable
          onPressOut={() => {
            setPage('map');
          }}>
          <Text style={styles.buttonText}>Mapa</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <SafeAreaView style={styles.mapContainer}>
      <WebView source={{ html: map }} />
      <View style={styles.button}>
        <Pressable
          onPressOut={() => {
            setPage('list');
          }}>
          <Text style={styles.buttonText}>Powrót</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: colorPalette.backgroundColor,
  },
  listElement: {
    width: width,
    height: height / 10,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mapContainer: {
    //flex: 1,
    position: "absolute",
    //top: height * 0.01,
    backgroundColor: colorPalette.backgroundColor,
    height: height * 0.89,
    width: width,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    //backgroundColor: 'white',
    flex: 1,
  },
  button: {
    backgroundColor: colorPalette.darkAccentColor,
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
    height: 50,
    width: 200,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: 'black',
  },
});

export default SheltersScreen;
