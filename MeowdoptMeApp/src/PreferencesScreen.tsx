import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useState} from 'react';

function PreferencesScreen() {
  const [currentOption, setCurrentOption] = useState('none');
  interface myButtonProps {
    title: string;
    buttonText: string;
  }

  function MyButton({title, buttonText}: myButtonProps) {
    return currentOption !== title ? (
      <Pressable
        style={styles.button}
        onPressOut={() => {
          setCurrentOption(title);
        }}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    ) : (
      <Text style={styles.noButtonText}>{buttonText}</Text>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <MyButton title={'AdFilters'} buttonText={'Set your filters'} />
      <MyButton title={'setPassword'} buttonText={'Set your password'} />
      <MyButton title={'setUsername'} buttonText={'Set your username'} />
      <MyButton title={'setMail'} buttonText={'Set your email'} />
      <MyButton title={'deleteAccount'} buttonText={'Delete your account'} />
      <MyButton title={'logout'} buttonText={'Logout'} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  noButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    maxHeight: 40,
    minWidth: 160,
    margin: 5,
  },
  button: {
    backgroundColor: 'royalblue',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    maxHeight: 40,
    minWidth: 160,
    margin: 5,
  },
});

export default PreferencesScreen;
