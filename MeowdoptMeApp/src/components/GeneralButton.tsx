import React, {useState} from 'react';
import {Text, Pressable, StyleProp, StyleSheet, TextStyle} from 'react-native';
import colorPalette from '../../assets/colors';

interface GeneralButtonProps {
  onPressOut: () => void;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export function GeneralButton({
  onPressOut,
  text,
  textStyle,
  disabled,
}: GeneralButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      style={[styles.button, isPressed && styles.buttonPressed]}
      disabled={disabled}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
        onPressOut();
      }}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorPalette.darkAccentColor,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: 50,
    width: 200,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: colorPalette.strongAccentColor,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    textShadowRadius: 4,
    textShadowOffset: {width: 2, height: 2},
    textShadowColor: 'black',
  },
});
