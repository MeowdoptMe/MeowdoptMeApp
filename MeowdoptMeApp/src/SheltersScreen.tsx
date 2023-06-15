import React from 'react';
import {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import map from './WebMap';
import {FlashList} from '@shopify/flash-list';
import {getShelters} from './ShelterPage/shelterUtils';
import colorPalette from '../assets/colors';
import {ShelterContext} from './Context';
import HomeScreen from './HomeScreen';
import type {Shelter} from './commonTypes';
import Status from './components/Status';

const {width, height} = Dimensions.get('window');

// @ts-expect-error
function SheltersScreen({navigation}) {
  const [page, setPage] = useState('list');
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const {shelter, setShelter} = useContext(ShelterContext);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  async function loadShelters() {
    try {
      const shelters = await getShelters();
      setShelters(shelters);
      setError(undefined);
      setLoading(false);
    } catch (e) {
      setError(e as string);
      setLoading(false);
    }
  }

  function onPressOut(shelter: Shelter) {
    setShelter(shelter);
    navigation.navigate(HomeScreen);
  }

  useEffect(() => {
    loadShelters();
  }, [shelter]);

  return loading || error ? (
    <Status loading={loading} error={error} style={styles.statusContainer} />
  ) : page === 'list' ? (
    <View style={styles.sectionContainer}>
      <FlashList
        data={shelters}
        estimatedItemSize={60}
        ListHeaderComponent={<ShelterTitle setPage={setPage} />}
        renderItem={({item}) => (
          <View style={styles.listElement}>
            <Pressable
              onPressOut={() => {
                onPressOut(item);
              }}>
              <Text style={styles.titleText}>{item.name}</Text>
              <Text style={styles.text}>{item.location}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  ) : (
    <View style={styles.mapContainer}>
      <WebView source={{html: map}} />
      <View style={styles.button}>
        <Pressable
          onPressOut={() => {
            setPage('list');
          }}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

interface ShelterTitleProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

function ShelterTitle({setPage}: ShelterTitleProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.shelterTitle}>Shelters</Text>
      <View style={styles.button}>
        <Pressable
          onPressOut={() => {
            setPage('map');
          }}>
          <Text style={styles.buttonText}>Map</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    width: width,
    height: height,
    backgroundColor: colorPalette.backgroundColor,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
  },
  shelterTitle: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listElement: {
    width: width * 0.9,
    height: height / 10,
    backgroundColor: colorPalette.lightAccentColor,
    margin: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    //flex: 1,
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
    textShadowOffset: {width: 2, height: 2},
    textShadowColor: 'black',
  },
});

export default SheltersScreen;
