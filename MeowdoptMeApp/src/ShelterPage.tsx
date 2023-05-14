import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ShelterPage() {
  return (
    <View style={styles.sectionContainer}>
      <Text>ShelterPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
export default ShelterPage;
