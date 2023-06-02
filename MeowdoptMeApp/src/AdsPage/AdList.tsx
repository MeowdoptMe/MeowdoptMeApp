import React from 'react';
import {Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ads} from '../sampleData/adsPhotos';
import type {Ad} from '../commonTypes';
import {AdListContext} from '../Context';
import AdContainer from './AdContainer';

const {height} = Dimensions.get('window');

function AdList() {
  const [data, setData] = React.useState(ads);
  function changeAdInfo(oldAd: Ad, newAd: Ad) {
    const newAds = data.map(ad => {
      if (ad === oldAd) {
        return newAd;
      }
      return ad;
    });
    setData(newAds);
  }

  function changeAdPhoto(oldAd: Ad, newAd: Ad) {
    const newAds = data.map(ad => {
      if (ad === oldAd) {
        return newAd;
      }
      return ad;
    });
    setData(newAds);
  }

  return (
    <AdListContext.Provider value={{changeAdInfo, changeAdPhoto}}>
      <FlashList
        data={data}
        estimatedItemSize={800}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={height}
        renderItem={({item}) => <AdContainer ad={item} />}
      />
    </AdListContext.Provider>
  );
}

export default AdList;
