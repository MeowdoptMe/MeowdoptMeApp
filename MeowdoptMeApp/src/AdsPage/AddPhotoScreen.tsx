import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {GeneralButton} from '../components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {AdContext, AdListContext} from '../Context';

const {width, height} = Dimensions.get('window');

function AddPhotoScreen() {
  const {refreshAd} = useContext(AdListContext);
  const {ad, adIndex} = useContext(AdContext);

  async function addPhoto() {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (response.didCancel) {
        return;
      }
      const newPhoto = response.assets![0];
      const newAd = {
        ...ad,
        photoAlbum: {
          ...ad.photoAlbum,
          photos: [...ad.photoAlbum.photos],
        },
      };
      newAd.photoAlbum.photos.push({img: newPhoto as any, description: ''});
      changeAd(newAd, adIndex);
    } catch (e) {
      throw e;
    }
  }

  return (
    <View style={styles.addPhotoScreen}>
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
