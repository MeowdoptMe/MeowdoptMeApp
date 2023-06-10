import React from 'react';
import {View, StyleSheet} from 'react-native';
import AdList from './AdList';
import type {Ad} from '../commonTypes'

interface AdsPageProps{
  ads: Ad[]
}


function AdsPage({ads}: AdsPageProps) {
  return (
    <View style={styles.listContainer}>
      <AdList ads={ads} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});

export default AdsPage;
