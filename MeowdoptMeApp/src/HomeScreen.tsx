import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.sectionContainer}>
      <Image
        style={styles.image}
        source={require('../assets/home.jpg')}
        resizeMode="contain"
      />
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
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export default HomeScreen;
