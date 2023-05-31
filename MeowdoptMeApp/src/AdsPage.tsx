import React, {createContext} from 'react';
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
import colorPalette from '../assets/colors';
import {ads} from './sampleData/adsPhotos';
import type {Ad} from './commonTypes';
import FastImage from 'react-native-fast-image';
import {GeneralButton} from './components/GeneralButton';
import {launchImageLibrary} from 'react-native-image-picker';

// "https://icons8.com";
const editIcon = require('../assets/edit-icon.png');
const {width, height} = Dimensions.get('window');

function AdsPage() {
  return (
    <View style={styles.listContainer}>
      <AdList />
    </View>
  );
}

const AdListContext = createContext<any>([]);

function AdList() {
  const [data, setData] = React.useState(ads);
  function changeAd(oldAd: Ad, newAd: Ad) {
    console.log('changing');
    const newAds = data.map(ad => {
      if (ad === oldAd) {
        return newAd;
      }
      return ad;
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
        renderItem={({item}) => <AdContainer ad={item} />}
      />
    </AdListContext.Provider>
  );
}

// @ts-expect-error
const AdContext = createContext<Ad>(undefined);

interface AdContainerProps {
  ad: Ad;
}

function AdContainer({ad}: AdContainerProps) {
  const [editModalVisible, setEditModalVisible] = React.useState(false);

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
                  setEditModalVisible(true);
                  // need to pass data here
                }}>
                <Image source={editIcon} style={styles.editIcon} />
              </Pressable>
            </View>
          )
        }
      />
      <EditModal
        ad={ad}
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
  const {changeAd} = React.useContext(AdListContext);

  const [name, setName] = React.useState(ad.pet.name);
  const [species, setSpecies] = React.useState(
    ad.pet.petCharacteristics.species,
  );
  const [gender, setGender] = React.useState(ad.pet.petCharacteristics.gender);
  const [breed, setBreed] = React.useState(ad.pet.petCharacteristics.breed);
  const [color, setColor] = React.useState(ad.pet.petCharacteristics.color[0]);
  const [year, setYear] = React.useState(
    String(ad.pet.petCharacteristics.dateOfBirth.year),
  );
  const [month, setMonth] = React.useState(
    String(ad.pet.petCharacteristics.dateOfBirth.month),
  );

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
      <GeneralButton
        text={'Save'}
        onPressOut={() => {
          const newAd = {
            ...ad,
            pet: {
              ...ad.pet,
              name: name,
              petCharacteristics: {
                ...ad.pet.petCharacteristics,
                species,
                gender,
                breed,
                color: [color],
                dateOfBirth: {
                  year: Number(year),
                  month: Number(month),
                },
              },
            },
          };
          changeAd(ad, newAd);
          setEditMode(false);
        }}
      />
    </View>
  );
}

interface EditModalProps {
  ad: Ad;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function EditModal({visible, setVisible}: EditModalProps) {
  async function onPressOut() {
    await launchImageLibrary({mediaType: 'photo'});
  }

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.editModal}>
        <GeneralButton text={'Change photo'} onPressOut={onPressOut} />

        <GeneralButton
          text={'Close'}
          onPressOut={() => {
            setVisible(false);
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
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
  infoIconContainer: {
    position: 'absolute',
    padding: 4,
    bottom: height * 0.15,
    right: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colorPalette.lightAccentColor,
  },
  infoIcon: {
    height: 50,
    width: 50,
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
    // justifyContent: 'center',
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
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: height * 0.25,
    left: width * 0.1,
    height: height * 0.5,
    width: width * 0.8,
    backgroundColor: colorPalette.lightAccentColor,
  },
  grief: {
    height: 50,
    width: 50,
  },
});

export default AdsPage;
