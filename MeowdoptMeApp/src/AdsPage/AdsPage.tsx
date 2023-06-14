import React from 'react';
import {View, StyleSheet} from 'react-native';
import AdList from './AdList';


function AdsPage() {
  return (
    <View style={styles.listContainer}>
      <AdList />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});

export default AdsPage;
