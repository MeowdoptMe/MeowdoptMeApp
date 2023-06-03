import React from 'react';
import {Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ads} from '../sampleData/adsPhotos';
import type {Ad} from '../commonTypes';
import {AdContext, AdListContext} from '../Context';
import AdContainer from './AdContainer';

const {height} = Dimensions.get('window');

function AdList() {
  const [data, setData] = React.useState(ads);
  console.log('data on render:', data[0].photoAlbum);
  function changeAd(ad: Ad, index: number) {
    console.log(ad.photoAlbum);
    const newAds = data.map((item, i) => {
      if (i === index) {
        console.log('swappers');
        return ad;
      }
      return item;
    });
    console.log('changeAd');
    console.log(newAds[0].photoAlbum);
    setData(newAds);
  }

  console.log('render');
  console.log(data[0].photoAlbum);

  return (
    <AdListContext.Provider value={{changeAd}}>
      <FlashList
        data={data}
        estimatedItemSize={800}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={height}
        renderItem={({item, index}) => (
          <AdContext.Provider value={{ad: item, adIndex: index}}>
            <AdContainer />
          </AdContext.Provider>
        )}
      />
    </AdListContext.Provider>
  );
}

export default AdList;
