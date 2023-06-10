import React from 'react';
import { ShelterContext } from './Context';
import AdsPage from './AdsPage/AdsPage';
import ShelterPage from './ShelterPage/ShelterPage';
import { ads } from './sampleData/adsPhotos';

function HomeScreen() {
  const { shelter } = React.useContext(ShelterContext);
  return shelter ? <ShelterPage ads={ads} /> : <AdsPage ads={ads} />;
}

export default HomeScreen;
