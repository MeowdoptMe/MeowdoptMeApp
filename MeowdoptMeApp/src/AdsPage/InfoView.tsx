import React, {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {AdContext} from '../Context';
import {Modal} from 'react-native';
import {Shelter} from '../commonTypes';
import adUtils from './adUtils';

const {width, height} = Dimensions.get('window');

interface InfoViewProps {
  setEdit: (edit: boolean) => void;
}

function InfoView({setEdit}: InfoViewProps) {
  const {ad} = useContext(AdContext);
  const {gender, breed, color, dateOfBirth} = ad.pet.petCharacteristics;
  const [aboutModalVisible, setAboutModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);
  const [shelterInfo, setShelterInfo] = React.useState<Shelter>(
    undefined as any,
  );

  React.useEffect(() => {
    fetchShelterInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function fetchShelterInfo() {
    try {
      const response = await adUtils.getShelterData(Number(ad.shelter));
      setShelterInfo(response);
    } catch (e) {}
  }

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
        text={'About'}
        onPressOut={() => {
          setAboutModalVisible(true);
        }}
      />
      <GeneralButton
        text={'Contact'}
        onPressOut={() => {
          fetchShelterInfo();
          setContactModalVisible(true);
        }}
      />
      <GeneralButton
        text={'Edit'}
        onPressOut={() => {
          setEdit(true);
        }}
      />
      <Modal
        animationType="fade"
        visible={contactModalVisible}
        transparent={true}>
        <View style={styles.aboutModalContainer}>
          <View style={styles.aboutModalContent}>
            <Text style={styles.aboutModalText}>{ad.pet.name}</Text>
            <Text style={styles.aboutModalText}>{shelterInfo?.name}</Text>
            <Text style={styles.aboutModalText}>{shelterInfo?.location}</Text>
            <Text style={styles.aboutModalText}>{shelterInfo?.email}</Text>
            <Text style={styles.aboutModalText}>{shelterInfo?.phone}</Text>
            <GeneralButton
              text={'Close'}
              onPressOut={() => {
                setContactModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        visible={aboutModalVisible}
        transparent={true}>
        <View style={styles.aboutModalContainer}>
          <View style={styles.aboutModalContent}>
            <Text style={styles.aboutModalText}>{ad.description}</Text>
            <GeneralButton
              text={'Close'}
              onPressOut={() => {
                setAboutModalVisible(false);
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
    top: height * 0.1,
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
    margin: 10,
  },
});

export default InfoView;
