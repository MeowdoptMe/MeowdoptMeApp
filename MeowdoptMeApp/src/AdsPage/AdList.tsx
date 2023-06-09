import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import type {Ad} from '../commonTypes';
import {AdContext, AdListContext} from '../Context';
import AdContainer from './AdContainer';
import adUtils from './adUtils';
import Status from '../components/Status';

const {width, height} = Dimensions.get('window');

function AdList() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [data, setData] = React.useState<Ad[]>([]);
  function changeAd(ad: Ad, index: number) {
    const newAds = data.map((item, i) => {
      if (i === index) {
        return ad;
      }
      return item;
    });
    setData(newAds);
  }

  async function fetchAds() {
    try {
      const ads = await adUtils.getAds();
      setData(ads);
      setError(undefined);
      setLoading(false);
    } catch (e) {
      setError(e as string);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAds();
  }, []);

  return loading || error ? (
    <Status loading={loading} error={error} style={styles.statusContainer} />
  ) : (
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

const styles = StyleSheet.create({
  statusContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdList;
