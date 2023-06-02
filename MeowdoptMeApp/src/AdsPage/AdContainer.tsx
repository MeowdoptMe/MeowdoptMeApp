import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import colorPalette from '../../assets/colors';
import type {Ad} from '../commonTypes';
import FastImage from 'react-native-fast-image';
import {GeneralButton} from '../components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {AdListContext, AdContext} from '../Context';

// "https://icons8.com";
const editIcon = require('../../assets/edit-icon.png');
const {width, height} = Dimensions.get('window');

interface AdContainerProps {
  ad: Ad;
}

function AdContainer({ad}: AdContainerProps) {
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const photoIndex = React.useRef(0);

  const data = Array.prototype.concat({}, ad.photoAlbum.photos);

  return (
    <View style={styles.listElement}>
      <View style={styles.listElementHeader}>
        <Text style={styles.listElementHeaderText}>{ad.pet.name}</Text>
      </View>
      <FlashList
        data={data}
        estimatedItemSize={400}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        snapToInterval={width}
        initialScrollIndex={1}
        renderItem={({item, index}) =>
          index === 0 ? (
            <AdContext.Provider value={ad}>
              <InfoScreen />
            </AdContext.Provider>
          ) : (
            <View style={styles.innerListElementContainer}>
              <FastImage style={styles.listElementImage} source={item.img} />
              <Pressable
                style={styles.editIconContainer}
                onPressOut={() => {
                  photoIndex.current = index - 1;
                  setEditModalVisible(true);
                }}>
                <Image source={editIcon} style={styles.editIcon} />
              </Pressable>
            </View>
          )
        }
      />
      <EditModal
        ad={ad}
        photoIndex={photoIndex.current}
        visible={editModalVisible}
        setVisible={setEditModalVisible}
      />
    </View>
  );
}

function InfoScreen() {
  const [EditMode, setEditMode] = React.useState(false);

  return EditMode ? (
    <InformationEdit setEditMode={setEditMode} />
  ) : (
    <InformationView setEditMode={setEditMode} />
  );
}

interface InformationViewProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function InformationView({setEditMode}: InformationViewProps) {
  const ad = React.useContext(AdContext);
  const {gender, breed, color, dateOfBirth} = ad.pet.petCharacteristics;
  function getAge() {
    const date = new Date();
    let age = date.getFullYear() - dateOfBirth.year;
    if (date.getMonth() < dateOfBirth.month) {
      age--;
    }
    if (age < 1) {
      age = 1;
    }
    return age;
  }
  const age = getAge();

  return (
    <View style={styles.informationScreenContainer}>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Gender:</Text>
        <Text style={styles.informationDataText}>{gender}</Text>
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Breed:</Text>
        <Text style={styles.informationDataText}>{breed}</Text>
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Color:</Text>
        <Text style={styles.informationDataText}>{color}</Text>
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Age:</Text>
        <Text style={styles.informationDataText}>{age}</Text>
      </View>
      <GeneralButton
        text={'Edit'}
        onPressOut={() => {
          setEditMode(true);
        }}
      />
    </View>
  );
}

interface InformationEditProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function InformationEdit({setEditMode}: InformationEditProps) {
  const ad = React.useContext(AdContext);
  const {changeAdInfo} = React.useContext(AdListContext);

  const [name, setName] = React.useState(ad.pet.name);
  const [species, setSpecies] = React.useState(
    ad.pet.petCharacteristics.species,
  );
  const [gender, setGender] = React.useState(ad.pet.petCharacteristics.gender);
  const [breed, setBreed] = React.useState(ad.pet.petCharacteristics.breed);
  const [color, setColor] = React.useState(ad.pet.petCharacteristics.color);
  const [year, setYear] = React.useState(
    String(ad.pet.petCharacteristics.dateOfBirth.year),
  );
  const [month, setMonth] = React.useState(
    String(ad.pet.petCharacteristics.dateOfBirth.month),
  );

  function onPressOut() {
    const newAd = ad;
    newAd.pet.name = name;
    newAd.pet.petCharacteristics = {
      species,
      gender,
      breed,
      color: color,
      dateOfBirth: {
        year: Number(year),
        month: Number(month),
      },
    };
    changeAdInfo(ad, newAd);
    setEditMode(false);
  }

  return (
    <View style={styles.informationScreenContainer}>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Name:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Gender:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={gender}
          onChangeText={text => setGender(text)}
        />
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Species:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={species}
          onChangeText={text => setSpecies(text)}
        />
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Breed:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={breed}
          onChangeText={text => setBreed(text)}
        />
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Color:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={color}
          onChangeText={text => setColor(text)}
        />
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Year of birth:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={year}
          onChangeText={text => setYear(text)}
        />
      </View>
      <View style={styles.informationScreenTextBubble}>
        <Text style={styles.informationKeyText}>Month of birth:</Text>
        <TextInput
          style={styles.informationDataChange}
          value={String(month)}
          onChangeText={text => setMonth(text)}
        />
      </View>
      <GeneralButton text={'Save'} onPressOut={onPressOut} />
    </View>
  );
}

interface EditModalProps {
  ad: Ad;
  photoIndex: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function EditModal({ad, photoIndex, visible, setVisible}: EditModalProps) {
  const {changeAdPhoto} = useContext(AdListContext);

  async function onPressOut() {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (response.didCancel) {
        return;
      }
      const newPhoto = response.assets![0];
      const newAd = ad;
      newAd.photoAlbum.photos[photoIndex].img = newPhoto as any;
      changeAdPhoto(ad, newAd);
      setVisible(false);
    } catch (e) {
      throw e;
    }
  }

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.editModal}>
        <View style={styles.editModalButtonsContainer}>
          <GeneralButton text={'Change photo'} onPressOut={onPressOut} />
          <GeneralButton
            text={'Close'}
            onPressOut={() => {
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listElement: {
    width: width,
    height: height,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listElementHeader: {
    borderRadius: 20,
    backgroundColor: colorPalette.lightAccentColor,
    overflow: 'hidden',
    position: 'absolute',
    top: height * 0.05,
  },
  listElementHeaderText: {
    fontSize: 50,
    fontStyle: 'italic',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {width: 1, height: 1.5},
    color: colorPalette.darkAccentColor,
  },
  editIconContainer: {
    position: 'absolute',
    padding: 4,
    bottom: height * 0.15,
    left: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colorPalette.lightAccentColor,
  },
  editIcon: {
    height: 50,
    width: 50,
  },
  innerListElementContainer: {
    height: height,
    width: width,
    alignItems: 'center',
  },
  listElementImage: {
    position: 'absolute',
    height: height * 0.71,
    width: width * 0.98,
    top: height * 0.15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  listElementTextContainer: {
    position: 'absolute',
    top: height * 0.7,
    width: width * 0.8,
    backgroundColor: colorPalette.lightAccentColor,
    borderWidth: 2,
    shadowRadius: 100,
  },
  listElementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  informationScreenContainer: {
    height: height,
    width: width,
    alignItems: 'center',
    top: height * 0.15,
  },
  informationScreenTextBubble: {
    width: width * 0.8,
    margin: 5,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colorPalette.lightAccentColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  informationKeyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorPalette.strongAccentColor,
  },
  informationDataText: {
    fontSize: 14,
    color: 'black',
  },
  informationDataChange: {
    fontSize: 14,
    color: 'black',
  },
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
});

export default AdContainer;
