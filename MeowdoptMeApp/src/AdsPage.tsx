import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import colorPalette from '../assets/colors';
import {ads} from './sampleData/adsPhotos';
import type {Ad} from './commonTypes';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

function AdsPage() {
  return (
    <View style={styles.listContainer}>
      <AdList />
    </View>
  );
}

function AdList() {
  return (
    <FlashList
      data={ads}
      estimatedItemSize={800}
      showsVerticalScrollIndicator={false}
      snapToAlignment={'start'}
      decelerationRate={'normal'}
      snapToInterval={height}
      renderItem={({item}) => <AdContainer ad={item} />}
    />
  );
}

interface AdContainerProps {
  ad: Ad;
}

function AdContainer({ad}: AdContainerProps) {
  return (
    <View style={styles.listElement}>
      <View style={styles.listElementHeader}>
        <Text style={styles.listElementHeaderText}>{ad.pet.name}</Text>
      </View>
      <FlashList
        data={ad.photoAlbum.photos}
        estimatedItemSize={400}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'normal'}
        snapToInterval={width}
        renderItem={({item}) => (
          <View style={styles.innerListElementContainer}>
            {/* @ts-expect-error Source is defined as string but we hax */}
            <FastImage style={styles.listElementImage} source={item.img} />
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
  performantToggle: {
    position: 'absolute',
    top: 0,
    right: 0,
    // backgroundColor: colorPalette.lightAccentColor,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: 'black',
    padding: 10,
    zIndex: 100,
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
