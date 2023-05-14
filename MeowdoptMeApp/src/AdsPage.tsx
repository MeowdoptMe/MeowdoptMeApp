import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';
const {width, height} = Dimensions.get('window');

// sample data
const Ads = [
  {
    name: 'Fifek',
    data: [
      {
        style: {backgroundColor: '#FF33A080'},
        number: 1,
      },
      {
        style: {backgroundColor: '#FF33C080'},
        number: 2,
      },
      {
        style: {backgroundColor: '#FF33E080'},
        number: 3,
      },
      {
        style: {backgroundColor: '#FF33F080'},
        number: 4,
      },
    ],
  },
  {
    name: 'Pumpon',
    data: [
      {
        style: {backgroundColor: '#AFFFFF80'},
        number: 1,
      },
      {
        style: {backgroundColor: '#AFFFDF80'},
        number: 2,
      },
      {
        style: {backgroundColor: '#AFFFBF80'},
        number: 3,
      },
      {
        style: {backgroundColor: '#AFFF0F80'},
        number: 4,
      },
    ],
  },
  {
    name: 'Brokuł',
    data: [
      {
        style: {backgroundColor: '#FFAFFF80'},
        number: 1,
      },
      {
        style: {backgroundColor: '#DFAFFF80'},
        number: 2,
      },
      {
        style: {backgroundColor: '#BFAFFF80'},
        number: 3,
      },
      {
        style: {backgroundColor: '#9FAFFF80'},
        number: 4,
      },
    ],
  },
  {
    name: 'Amir',
    data: [
      {
        style: {backgroundColor: '#0FFFFF80'},
        number: 1,
      },
      {
        style: {backgroundColor: '#0FDFFF80'},
        number: 2,
      },
      {
        style: {backgroundColor: '#0FBFFF80'},
        number: 3,
      },
      {
        style: {backgroundColor: '#0F9FFF80'},
        number: 4,
      },
    ],
  },
  {
    name: 'Kluska',
    style: {backgroundColor: '#1F1FFF80'},
    numbers: [1, 2, 3, 4, 5],
    data: [
      {
        style: {backgroundColor: '#1F1FFF80'},
        number: 1,
      },
      {
        style: {backgroundColor: '#1F3FFF80'},
        number: 2,
      },
      {
        style: {backgroundColor: '#1F5FFF80'},
        number: 3,
      },
      {
        style: {backgroundColor: '#1F7FFF80'},
        number: 4,
      },
    ],
  },
  {
    name: 'Biniu',
    data: [
      {
        style: {backgroundColor: '#BFFF2F80'},
        number: 1,
      },
      {
        style: {backgroundColor: '#BFFF4F80'},
        number: 2,
      },
      {
        style: {backgroundColor: '#BFFF6F80'},
        number: 3,
      },
      {
        style: {backgroundColor: '#BFFF8F80'},
        number: 4,
      },
    ],
  },
  {
    name: 'Dyzio',
    data: [
      {
        style: {backgroundColor: '#FFBFFF80'},
        number: 1,
      },
      {
        style: {backgroundColor: '#DFBFFF80'},
        number: 2,
      },
      {
        style: {backgroundColor: '#BFBFFF80'},
        number: 3,
      },
      {
        style: {backgroundColor: '#9FBFFF80'},
        number: 4,
      },
    ],
  },
  {
    name: 'Wojtyłek',
    data: [
      {
        style: {backgroundColor: '#A10F1080'},
        number: 1,
      },
      {
        style: {backgroundColor: '#A10F3080'},
        number: 2,
      },
      {
        style: {backgroundColor: '#A10F5080'},
        number: 3,
      },
      {
        style: {backgroundColor: '#A10F7080'},
        number: 4,
      },
    ],
  },
];

function AdsPage() {
  return (
    <View style={styles.listContainer}>
      <FlashList
        data={Ads}
        estimatedItemSize={340}
        renderItem={({item}) => <AdFlashList item={item} />}
      />
    </View>
  );
}

interface AdFlashListProps {
  item: {
    name: string;
    data: Array<{
      style: {
        backgroundColor: string;
      };
      number: number;
    }>;
  };
}

function AdFlashList({item: overItem}: AdFlashListProps) {
  return (
    <FlashList
      data={overItem.data}
      estimatedItemSize={90}
      horizontal={true}
      renderItem={({item}) => (
        <View style={[styles.listElement, item.style]}>
          <Text style={styles.listElementText}>{overItem.name}</Text>
          <Text style={styles.listElementText}>{item.number}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  listElement: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listElementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AdsPage;
