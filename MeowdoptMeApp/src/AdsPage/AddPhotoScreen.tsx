import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {AdContext, AdListContext, AppContext, guestUser} from '../Context';
import adUtils from './adUtils';
import Status from '../components/Status';

const {width, height} = Dimensions.get('window');

function AddPhotoScreen() {
  const {user} = useContext(AppContext);
  const {refreshAd} = useContext(AdListContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const {ad} = useContext(AdContext);

  async function addPhoto() {
    if (user === guestUser) {
      setError('Cannot be performed as a guest user');
      return;
    }
    setLoading(true);
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (response.didCancel) {
        return;
      }
      const newPhoto = response.assets![0];
      await adUtils.addPhotoToAlbum(user.token, newPhoto, ad.photoAlbum);
      await refreshAd(ad.id);
    } catch (e) {
      setError(e as string);
    }
    setLoading(false);
  }

  return (
    <View style={styles.addPhotoScreen}>
      <Status loading={loading} error={error} />
      <GeneralButton text={'Add photo'} onPressOut={addPhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  addPhotoScreen: {
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddPhotoScreen;
