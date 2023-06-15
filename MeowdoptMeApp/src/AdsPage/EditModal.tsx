import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, Modal, TextInput} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {AdContext, AdListContext, AppContext, guestUser} from '../Context';
import {Photo} from '../commonTypes';
import adUtils from './adUtils';
import Status from '../components/Status';

const {width, height} = Dimensions.get('window');

interface EditModalProps {
  photo: Photo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function EditModal({photo, visible, setVisible}: EditModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const {refreshAd} = useContext(AdListContext);
  const {ad} = useContext(AdContext);
  const {user} = useContext(AppContext);

  const [description, setDescription] = React.useState(photo?.description);
  const [editDescriptionModalVisible, setEditDescriptionModalVisible] =
    React.useState(false);

  async function changePhoto() {
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
      await adUtils.editPhotoPicture(
        user.token,
        newPhoto,
        ad.photoAlbum,
        photo.id,
      );
      setVisible(false);
      await refreshAd(ad.id);
    } catch (e) {
      setError(e as string);
    }
    setLoading(false);
  }

  async function changeDescription() {
    if (user === guestUser) {
      setError('Cannot be performed as a guest user');
      return;
    }
    setLoading(true);
    try {
      await adUtils.editPhotoDescription(
        user.token,
        description,
        ad.photoAlbum,
        photo.id,
      );
      setVisible(false);
      await refreshAd(ad.id);
    } catch (e) {
      setError(e as string);
    }
    setLoading(false);
  }

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.editModal}>
        <View style={styles.editModalButtonsContainer}>
          <Status loading={loading} error={error} />
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
    top: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.lightAccentColor,
    borderRadius: 20,
    padding: 5,
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
