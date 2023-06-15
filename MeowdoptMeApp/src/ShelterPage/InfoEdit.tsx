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
import { GeneralButton } from '../components/GeneralButton';
import { ShelterContext, AppContext, guestUser } from '../Context';
import { Shelter } from '../commonTypes';
import { editShelter, getShelterById } from './shelterUtils';
import Status from '../components/Status';
import authUtils from '../authUtils';

const { width, height } = Dimensions.get('window');

interface InfoEditProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfoEdit({ setEditMode }: InfoEditProps) {
  const { shelter: _shelter, setShelter } = React.useContext(ShelterContext);
  const shelter = _shelter!

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);


  const [editAboutModalVisible, setEditAboutModalVisible] =
    React.useState(false);

  const [about, setAbout] = React.useState(shelter.description);
  const [name, setName] = React.useState(shelter.name);
  const [location, setLocation] = React.useState(shelter.location);
  const [email, setEmail] = React.useState(shelter.email);
  const [phone, setPhone] = React.useState(shelter.phone);

  const { user } = React.useContext(AppContext);

  async function putShelter(newShelter: Shelter) {
    try {
      const sleepPromise = authUtils.sleep();
      await editShelter(newShelter, user.token);
      await sleepPromise;
      const updatedShelter = await getShelterById(shelter.id)
      setShelter(updatedShelter);
      setEditMode(false);
    } catch (e) {
      setError(e as string);
    } finally {
      setLoading(false);
    }
  }


  function onPressOut() {
    if (user === guestUser) {
      setError('Cannot be performed as guest user :c')
      return
    }
    const newShelter: Shelter = {
      ...shelter,
      description: about,
      name: name,
      location: location,
      email: email,
      phone: phone,
    };
    setLoading(true);
    setError(undefined);
    putShelter(newShelter);
  }

  return (
    <View style={styles.informationScreenContainer}>
      <View style={styles.offsetBox}>
        <View style={styles.informationScreenTextBubble}>
          <Text style={styles.informationKeyText}>Name:</Text>
          <TextInput
            style={styles.informationDataChange}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.informationScreenTextBubble}>
          <Text style={styles.informationKeyText}>Location:</Text>
          <TextInput
            style={styles.informationDataChange}
            value={location}
            onChangeText={text => setLocation(text)}
          />
        </View>
        <View style={styles.informationScreenTextBubble}>
          <Text style={styles.informationKeyText}>Email:</Text>
          <TextInput
            style={styles.informationDataChange}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.informationScreenTextBubble}>
          <Text style={styles.informationKeyText}>Phone:</Text>
          <TextInput
            style={styles.informationDataChange}
            value={String(phone)}
            onChangeText={text => setPhone(Number(text))}
          />
        </View>

        <Status error={error} loading={loading} />
        <View style={styles.editButtonsContainer}>
          <GeneralButton
            disabled={loading}
            text={'Save'}
            onPressOut={onPressOut}
            extraStyle={styles.editButtonStyle}
          />
          <GeneralButton
            disabled={loading}
            text={'About'}
            onPressOut={() => setEditAboutModalVisible(true)}
            extraStyle={styles.editButtonStyle}
          />
        </View>
        <GeneralButton disabled={loading} text={'Cancel'} onPressOut={() => setEditMode(false)} />
      </View>
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
    backgroundColor: colorPalette.backgroundColor,
    height: height,
    width: width,
    alignItems: 'center',
    top: height * 0,
  },
  offsetBox:{
    flex: 1,
    position: "absolute",
    top: height*0.1,
    alignItems: "center",
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
