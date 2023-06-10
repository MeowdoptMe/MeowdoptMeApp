import React from 'react';
import {Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import type {Ad} from '../commonTypes';
import {AdContext, AdListContext, ShelterContext} from '../Context';
import AdContainer from './AdContainer';
import ShelterAd from '../ShelterPage/ShelterAd';

const {height} = Dimensions.get('window');


interface AdListProps{
  ads: Ad[]
}

function AdList({ads}: AdListProps) {
  const [data, setData] = React.useState(ads);
  const { shelter } = React.useContext(ShelterContext);

  function changeAd(ad: Ad, index: number) {
    const newAds = data.map((item, i) => {
      if (i === index) {
        return ad;
      }
      return item;
    });
    setData(newAds);
  }

  return (
    <AdListContext.Provider value={{changeAd}}>
      <FlashList
        data={data}
        estimatedItemSize={800}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={height}
        ListHeaderComponent={shelter ? <ShelterAd/> : null}
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
