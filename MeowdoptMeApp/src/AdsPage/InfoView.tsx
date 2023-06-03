import React, {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {AdContext} from '../Context';
import {Modal} from 'react-native';

const {width, height} = Dimensions.get('window');

interface InfoViewProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfoView({setEditMode}: InfoViewProps) {
  const {ad} = useContext(AdContext);
  const {gender, breed, color, dateOfBirth} = ad.pet.petCharacteristics;
  const [aboutModalVisible, setAboutModalVisible] = React.useState(false);

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
        text={'About'}
        onPressOut={() => {
          setAboutModalVisible(true);
        }}
      />
      <GeneralButton
        text={'Edit'}
        onPressOut={() => {
          setEditMode(true);
        }}
      />
      <Modal
        animationType="fade"
        visible={aboutModalVisible}
        transparent={true}>
        <View style={styles.aboutModalContainer}>
          <View style={styles.aboutModalContent}>
            <Text style={styles.aboutModalText}>{ad.pet.about}</Text>
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

export default InfoView;
