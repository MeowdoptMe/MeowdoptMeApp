import React from 'react';
import {ShelterContext} from './Context';
import AdsPage from './AdsPage';
import ShelterPage from './ShelterPage';

function HomeScreen() {
  const {shelter} = React.useContext(ShelterContext);
  return shelter ? <ShelterPage /> : <AdsPage />;
}

export default HomeScreen;
