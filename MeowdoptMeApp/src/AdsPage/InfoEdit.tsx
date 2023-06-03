import React from 'react';
import {View, StyleSheet, Text, Dimensions, TextInput} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {AdContext, AdListContext} from '../Context';

const {width, height} = Dimensions.get('window');

interface InfoEditProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfoEdit({setEditMode}: InfoEditProps) {
  const {ad, adIndex} = React.useContext(AdContext);
  const {changeAd} = React.useContext(AdListContext);

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
    const newAd = {
      ...ad,
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
    changeAd(newAd, adIndex);
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
  informationDataChange: {
    fontSize: 14,
    color: 'black',
  },
});

export default InfoEdit;
