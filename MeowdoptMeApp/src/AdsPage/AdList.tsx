import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import type {Ad} from '../commonTypes';
import {AdContext, AdListContext, ShelterContext} from '../Context';
import AdContainer from './AdContainer';
import ShelterAd from '../ShelterPage/ShelterAd';
import adUtils from './adUtils';
import Status from '../components/Status';

const { width, height } = Dimensions.get('window');


function AdList() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [data, setData] = React.useState<Ad[]>([]);
  const {shelter} = React.useContext(ShelterContext);

  async function refreshAd(adIndex: number) {
    setLoading(true);
    try {
      const updatedAd = await adUtils.getAdById(adIndex);
      const newData = data.map(item => {
        if (item.id === adIndex) {
          return updatedAd;
        }
        return item;
      });
      setData(newData);
      setError(undefined);
      setLoading(false);
    } catch (e) {
      setError(e as string);
      setLoading(false);
    }
  }

  async function fetchAds() {
    try {
      const ads = await adUtils.getAds();
      let fetchedData: Ad[] = [];
      if (shelter !== undefined) {
        ads.forEach(ad => {
          if (Number(ad.shelter) === shelter.id) {
            fetchedData.push(ad);
          }
        });
      } else {
        fetchedData = ads;
      }
      setData(fetchedData);
      setError(undefined);
      setLoading(false);
    } catch (e) {
      setError(e as string);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shelter]);

  return loading || error ? (
    <Status loading={loading} error={error} style={styles.statusContainer} />
  ) : (
    <AdListContext.Provider value={{ refreshAd }}>
      <FlashList
        data={data}
        extraData={data}
        estimatedItemSize={800}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={height}
        ListHeaderComponent={shelter ? <ShelterAd /> : null}
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
