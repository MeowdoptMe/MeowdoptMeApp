import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ad } from '../commonTypes';
import { ShelterContext } from '../Context';
import AdsPage from '../AdsPage/AdsPage';



function ShelterPage() {

  return (
    <AdsPage />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
export default ShelterPage;