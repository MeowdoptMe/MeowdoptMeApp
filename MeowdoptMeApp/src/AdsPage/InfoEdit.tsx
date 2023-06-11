import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {AdContext, AdListContext, AppContext, guestUser} from '../Context';
import adUtils from './adUtils';
import Status from '../components/Status';

const {width, height} = Dimensions.get('window');

interface InfoEditProps {
  setEdit: (edit: boolean) => void;
}

function InfoEdit({setEdit}: InfoEditProps) {
  const {ad} = React.useContext(AdContext);
  const {refreshAd} = React.useContext(AdListContext);
  const {user} = React.useContext(AppContext);

  const [editAboutModalVisible, setEditAboutModalVisible] =
    React.useState(false);

  const [error, setError] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const [about, setAbout] = React.useState(ad.description);
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

  async function onPressOut() {
    if (user.token === guestUser.token) {
      setError('Cannot be performed as a guest user');
      return;
    }
    setLoading(true);
    setError(undefined);
    const newAd = {
      ...ad,
      description: about,
      pet: {
        ...ad.pet,
        name,
        petCharacteristics: {
          ...ad.pet.petCharacteristics,
          species,
          gender,
          breed,
          color,
          dateOfBirth: {
            year: Number(year),
            month: Number(month),
          },
        },
      },
    };
    try {
      await adUtils.editAd(user.token, newAd);
      await refreshAd(ad.id);
      setEdit(false);
    } catch (e) {
      setError(e as string);
    }
    setLoading(false);
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
      <Status error={error} loading={loading} />
      <View style={styles.editButtonsContainer}>
        <GeneralButton
          text={'Save'}
          onPressOut={onPressOut}
          disabled={loading}
          extraStyle={styles.editButtonStyle}
        />
        <GeneralButton
          text={'About'}
          disabled={loading}
          onPressOut={() => setEditAboutModalVisible(true)}
          extraStyle={styles.editButtonStyle}
        />
      </View>
      <GeneralButton
        text={'Cancel'}
        onPressOut={() => setEdit(false)}
        disabled={loading}
      />
      <Modal
        animationType="fade"
        visible={editAboutModalVisible}
        transparent={true}>
        <View style={styles.aboutModalContainer}>
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  informationScreenContainer: {
    height: height,
    width: width,
    alignItems: 'center',
    top: height * 0,
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
  informationDataChange: {
    fontSize: 14,
    color: 'black',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButtonStyle: {
    width: width * 0.4,
  },
  aboutModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
    height: height,
    width: width,
  },
  aboutModalContent: {
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

export default InfoEdit;
