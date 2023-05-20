import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import colorPalette from '../assets/colors';
// import { ads } from './sampleData/adsPhotos';
// import type {Ad} from './commonTypes';
import {ads} from './sampleData/adsColorOnly';
import type {Ad} from './sampleData/adsColorOnly';

const {width, height} = Dimensions.get('window');

function AdsPage() {
  // loadSampleData();

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={ads}
        estimatedItemSize={340}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'normal'}
        snapToInterval={height}
        initialScrollIndex={0}
        renderItem={({item}) => <AdContainer ad={item} />}
      />
    </View>
  );
}

interface AdFlashListProps {
  ad: Ad;
}

function AdContainer({ad}: AdFlashListProps) {
  return (
    <View style={styles.listElement}>
      <View style={styles.listElementHeader}>
        <Text style={styles.listElementHeaderText}>{ad.pet.name}</Text>
      </View>
      <FlashList
        data={ad.photoAlbum}
        estimatedItemSize={90}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'normal'}
        snapToInterval={width}
        initialScrollIndex={0}
        renderItem={({item}) => (
          <View style={styles.innerListElementContainer}>
            <View
              style={[
                styles.listElementImage,
                {backgroundColor: item.backgroundColor},
              ]}
            />
            {item.description && (
              <View style={styles.listElementTextContainer}>
                <Text style={styles.listElementText}>{item.description}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listElement: {
    width: width,
    height: height,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listElementHeader: {
    borderRadius: 20,
    backgroundColor: colorPalette.lightAccentColor,
    overflow: 'hidden',
    position: 'absolute',
    top: height * 0.05,
  },
  listElementHeaderText: {
    fontSize: 50,
    fontStyle: 'italic',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {width: 1, height: 1.5},
    color: colorPalette.darkAccentColor,
  },
  innerListElementContainer: {
    height: height,
    width: width,
    alignItems: 'center',
  },
  listElementImage: {
    position: 'absolute',
    height: height * 0.8,
    width: width * 0.98,
    top: height * 0.15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  listElementTextContainer: {
    position: 'absolute',
    top: height * 0.7,
    width: width * 0.8,
    backgroundColor: colorPalette.lightAccentColor,
    borderWidth: 2,
    shadowRadius: 100,
  },
  listElementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AdsPage;
