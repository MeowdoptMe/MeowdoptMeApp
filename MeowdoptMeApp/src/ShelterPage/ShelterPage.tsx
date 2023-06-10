import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ad } from '../commonTypes';
import { ShelterContext } from '../Context';
import AdsPage from '../AdsPage/AdsPage';


interface ShelterPageProps {
  ads: Ad[];
}

function ShelterPage({ ads }: ShelterPageProps) {

  const { shelter } = React.useContext(ShelterContext);

  const shelterAds: Ad[] = [];

  ads.forEach(ad => {
    if (Number(ad.shelter) === shelter?.id) {
      shelterAds.push(ad);
    }
  })

  return (
    <AdsPage ads={shelterAds} />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
export default ShelterPage;
