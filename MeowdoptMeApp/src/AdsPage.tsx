import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import colorPalette from '../assets/colors';
import {ads} from './sampleData/adsPhotos';
import type {Ad} from './commonTypes';
import FastImage from 'react-native-fast-image';
import {GeneralButton} from './components/GeneralButton';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-reanimated';

// "https://icons8.com"
const infoIcon = require('../assets/info-icon.png');
const editIcon = require('../assets/edit-icon.png');
const grief = require('../assets/grief.png');
const {width, height} = Dimensions.get('window');

function AdsPage() {
  return (
    <View style={styles.listContainer}>
      <AdList />
    </View>
  );
}

function AdList() {
  return (
    <FlashList
      data={ads}
      estimatedItemSize={800}
      showsVerticalScrollIndicator={false}
      snapToAlignment={'start'}
      decelerationRate={'normal'}
      snapToInterval={height}
      renderItem={({item}) => <AdContainer ad={item} />}
    />
  );
}

interface AdContainerProps {
  ad: Ad;
}

function AdContainer({ad}: AdContainerProps) {
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [modalDisplayData, setModalDisplayData] = React.useState({});

  return (
    <View style={styles.listElement}>
      <View style={styles.listElementHeader}>
        <Text style={styles.listElementHeaderText}>{ad.pet.name}</Text>
      </View>
      <FlashList
        data={ad.photoAlbum.photos}
        estimatedItemSize={400}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'normal'}
        snapToInterval={width}
        renderItem={({item}) => (
          <View style={styles.innerListElementContainer}>
            {/* @ts-expect-error Source is defined as string but we hax */}
            <FastImage style={styles.listElementImage} source={item.img} />
            <Pressable
              style={styles.infoIconContainer}
              onPressOut={() => {
                setInfoModalVisible(true);
              }}>
              <Image source={infoIcon} style={styles.infoIcon} />
            </Pressable>
            <Pressable
              style={styles.editIconContainer}
              onPressOut={() => {
                setEditModalVisible(true);
                // need to pass data here
              }}>
              <Image source={editIcon} style={styles.editIcon} />
            </Pressable>
          </View>
        )}
      />
      <EditModal
        ad={ad}
        visible={editModalVisible}
        setVisible={setEditModalVisible}
      />
      <InformationModal
        visible={infoModalVisible}
        setVisible={setInfoModalVisible}
      />
    </View>
  );
}

interface InformationModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function InformationModal({visible, setVisible}: InformationModalProps) {
  const [animationStarted, setAnimationStarted] = React.useState(false);
  const spin = useSharedValue(0);
  const [size, setSize] = React.useState(27);
  const sharedSize = useSharedValue(27);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: size,
      height: size * 1.4,
      width: size * 1.4,
      borderWidth: 2,
      borderStyle: 'dotted',
      backgroundColor: colorPalette.lightAccentColor,
      overflow: 'hidden',
      transform: [{rotate: `${spin.value}deg`}],
    };
  });

  useEffect(() => {
    if (animationStarted) {
      spin.value = withRepeat(
        withTiming(
          360,
          {
            duration: 900,
            easing: Easing.inOut(Easing.sin),
          },
          () => {
            sharedSize.value = sharedSize.value / 0.9;
            runOnJS(setSize)(sharedSize.value);
          },
        ),
        -1,
        false,
      );
    }
  }, [animationStarted, sharedSize, spin]);

  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.informationModal}>
        <Pressable
          onPressOut={() => {
            setAnimationStarted(true);
          }}>
          <Animated.View style={animatedStyle}>
            <Animated.Image source={grief} style={styles.grief} />
          </Animated.View>
        </Pressable>
        <GeneralButton
          text={'Close'}
          onPressOut={() => {
            setVisible(false);
          }}
        />
      </View>
    </Modal>
  );
}

interface EditModalProps {
  ad: Ad;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function EditModal({ad, visible, setVisible}: EditModalProps) {
  return (
    <Modal animationType={'slide'} visible={visible} transparent={true}>
      <View style={styles.editModal}>
        <Text style={styles.listElementText}>{ad.pet.name}</Text>
        <Text style={styles.listElementText}>
          {ad.pet.petCharacteristics.gender}
        </Text>
        <Text style={styles.listElementText}>
          {ad.pet.petCharacteristics.breed}
        </Text>
        <Text style={styles.listElementText}>
          {ad.pet.petCharacteristics.dateOfBirth?.year}
        </Text>
        <Text style={styles.listElementText}>
          {ad.pet.petCharacteristics.dateOfBirth?.month}
        </Text>
        <Text style={styles.listElementText}>
          {ad.pet.petCharacteristics.color}
        </Text>
        <Text style={styles.listElementText}>
          {ad.pet.petCharacteristics.gender}
        </Text>
        <GeneralButton
          text={'Close'}
          onPressOut={() => {
            setVisible(false);
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listElement: {
    width: width,
    height: height,
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listElementHeader: {
    borderRadius: 20,
    backgroundColor: colorPalette.lightAccentColor,
    overflow: 'hidden',
    position: 'absolute',
    top: height * 0.05,
  },
  listElementHeaderText: {
    fontSize: 50,
    fontStyle: 'italic',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {width: 1, height: 1.5},
    color: colorPalette.darkAccentColor,
  },
  infoIconContainer: {
    position: 'absolute',
    padding: 4,
    bottom: height * 0.15,
    right: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colorPalette.lightAccentColor,
  },
  infoIcon: {
    height: 50,
    width: 50,
  },
  editIconContainer: {
    position: 'absolute',
    padding: 4,
    bottom: height * 0.15,
    left: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colorPalette.lightAccentColor,
  },
  editIcon: {
    height: 50,
    width: 50,
  },
  innerListElementContainer: {
    height: height,
    width: width,
    alignItems: 'center',
  },
  listElementImage: {
    position: 'absolute',
    height: height * 0.71,
    width: width * 0.98,
    top: height * 0.15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  listElementTextContainer: {
    position: 'absolute',
    top: height * 0.7,
    width: width * 0.8,
    backgroundColor: colorPalette.lightAccentColor,
    borderWidth: 2,
    shadowRadius: 100,
  },
  listElementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  informationModal: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: height * 0.25,
    left: width * 0.1,
    height: height * 0.5,
    width: width * 0.8,
    borderRadius: width * 0.5,
    backgroundColor: colorPalette.lightAccentColor,
  },
  editModal: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: height * 0.25,
    left: width * 0.1,
    height: height * 0.5,
    width: width * 0.8,
    backgroundColor: colorPalette.lightAccentColor,
  },
  grief: {
    height: 50,
    width: 50,
  },
});

export default AdsPage;
