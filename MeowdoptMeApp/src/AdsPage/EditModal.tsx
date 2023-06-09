import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, Modal, TextInput} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {AdContext, AdListContext} from '../Context';
import {Photo} from '../commonTypes';

const {width, height} = Dimensions.get('window');

interface EditModalProps {
  photos: Photo[];
  photoIndex: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function EditModal({photos, photoIndex, visible, setVisible}: EditModalProps) {
  const {changeAd} = useContext(AdListContext);
  const {ad, adIndex} = useContext(AdContext);

  const [description, setDescription] = React.useState(
    photos[photoIndex].description,
  );
  const [editDescriptionModalVisible, setEditDescriptionModalVisible] =
    React.useState(false);

  async function changePhoto() {
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
          photos: ad.photoAlbum.photos.map((photo, index) => {
            if (index === photoIndex) {
              return {
                ...photo,
                img: newPhoto as any,
              };
            }
            return photo;
          }),
        },
      };
      changeAd(newAd, adIndex);
      setVisible(false);
    } catch (e) {
      throw e;
    }
  }

  function changeDescription() {
    const newAd = {
      ...ad,
      photoAlbum: {
        ...ad.photoAlbum,
        photos: ad.photoAlbum.photos.map((photo, index) => {
          if (index === photoIndex) {
            return {
              ...photo,
              description,
            };
          }
          return photo;
        }),
      },
    };
    changeAd(newAd, adIndex);
    setVisible(false);
  }

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.editModal}>
        <View style={styles.editModalButtonsContainer}>
          <GeneralButton text={'Change photo'} onPressOut={changePhoto} />
          <GeneralButton
            text={'Change description'}
            textStyle={styles.changeDescriptionText}
            onPressOut={() => setEditDescriptionModalVisible(true)}
          />
          <GeneralButton
            text={'Close'}
            onPressOut={() => {
              setVisible(false);
            }}
          />
        </View>
        <Modal
          animationType="fade"
          visible={editDescriptionModalVisible}
          transparent={true}>
          <View style={styles.changeDescriptionContainer}>
            <View style={styles.changeDescriptionContent}>
              <TextInput
                style={styles.aboutModalText}
                value={description}
                onChangeText={text => setDescription(text)}
                multiline={true}
              />
              <GeneralButton
                text={'Save'}
                onPressOut={() => {
                  changeDescription();
                  setEditDescriptionModalVisible(false);
                }}
              />
              <GeneralButton
                text={'Cancel'}
                onPressOut={() => {
                  setEditDescriptionModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  editModal: {
    top: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.lightAccentColor,
    borderRadius: 20,
  },
  changeDescriptionText: {
    fontSize: 22,
  },
  changeDescriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
    height: height,
    width: width,
  },
  changeDescriptionContent: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.lightAccentColor,
    borderRadius: 20,
  },
  aboutModalText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
    margin: 30,
  },
});

export default EditModal;
