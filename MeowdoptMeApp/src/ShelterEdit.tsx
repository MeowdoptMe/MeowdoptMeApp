import React from 'react';
import {View, StyleSheet, Text, Dimensions, TextInput} from 'react-native';
import colorPalette from '../../assets/colors';
import {GeneralButton} from '../components/GeneralButton';
import {ShelterContext, ShelterListContext} from '../Context';

const {width, height} = Dimensions.get('window');

interface ShelterEditProps {
  setEdit: (edit: boolean) => void;
}

function ShelterEdit({setEdit}: ShelterEditProps) {
  const {shelter} = React.useContext(ShelterContext);
  const {changeShelter} = React.useContext(ShelterListContext);

  const [name, setName] = React.useState(shelter.name);
  const [location, setLocation] = React.useState(shelter.location);
  const [email, setEmail] = React.useState(shelter.email);
  const [phone, setPhone] = React.useState(shelter.phone);

  function onPressOut() {
    const newShelter = {
      name: name,
      location: location,
      email: email,
      phone: phone,
    };
    changeShelter(newShelter);
    setEdit(false);
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
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>
      <View style={styles.editButtonsContainer}>
        <GeneralButton
          text={'Save'}
          onPressOut={onPressOut}
          extraStyle={styles.editButtonStyle}
        />
      </View>
      <GeneralButton text={'Cancel'} onPressOut={() => setEdit(false)} />
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
});

export default ShelterEdit;
