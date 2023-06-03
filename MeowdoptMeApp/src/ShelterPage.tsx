import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ad } from './commonTypes';
import { ShelterContext } from './Context';
import AdsPage from './AdsPage';


interface ShelterPageProps {
  ads: Ad[];
}

function ShelterPage({ ads }: ShelterPageProps) {
  // pobierz z kontekstu shelter
  // stworz nowa liste shelterAds taka,
  // ze sa tylko ogloszenia z tamtego
  const { shelter } = React.useContext(ShelterContext);
  //console.log(shelter)
  

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
