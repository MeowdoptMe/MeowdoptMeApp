import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, Modal} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {AdContext, AdListContext} from '../Context';

const {height} = Dimensions.get('window');

interface EditModalProps {
  photoIndex: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function EditModal({photoIndex, visible, setVisible}: EditModalProps) {
  const {changeAd} = useContext(AdListContext);
  const {ad, adIndex} = useContext(AdContext);

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
    // TODO
  }

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.editModal}>
        <View style={styles.editModalButtonsContainer}>
          <GeneralButton text={'Change photo'} onPressOut={changePhoto} />
          <GeneralButton
            text={'Change description'}
            textStyle={styles.changeDescriptionText}
            onPressOut={changeDescription}
          />
          <GeneralButton
            text={'Close'}
            onPressOut={() => {
              setVisible(false);
            }}
          />
        </View>
        {/* <Modal
          animationType="fade"
          visible={editDescriptionModalVisible}
          transparent={true}>
          <View style={styles.aboutDescriptionContainer}>
            <View style={styles.aboutModalContent}>
              <TextInput
                style={styles.aboutModalText}
                value={about}
                onChangeText={setAbout}
                multiline={true}
              />
              <GeneralButton
                text={'Close'}
                onPressOut={() => {
                  setEditAboutModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal> */}
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
});

export default EditModal;
