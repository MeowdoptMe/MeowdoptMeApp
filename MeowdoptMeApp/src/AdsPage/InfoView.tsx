import React, {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {AdContext} from '../Context';

const {width, height} = Dimensions.get('window');

interface InfoViewProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfoView({setEditMode}: InfoViewProps) {
  const {ad} = useContext(AdContext);
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
});

export default InfoView;
