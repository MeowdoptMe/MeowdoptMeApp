import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function PreferencesScreen() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.text}>Preferences Screen</Text>
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
  text: {
    color: 'black',
  },
});

export default PreferencesScreen;
