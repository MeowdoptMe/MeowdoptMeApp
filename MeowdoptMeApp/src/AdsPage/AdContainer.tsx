import React, {Dispatch, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import colorPalette from '../../assets/colors';
import FastImage from 'react-native-fast-image';
import {AdContext} from '../Context';
import InfoScreen from './InfoScreen';
import EditModal from './EditModal';
import AddPhotoScreen from './AddPhotoScreen';
import {Ad, Photo} from '../commonTypes';
import adUtils from './adUtils';
import Status from '../components/Status';

// "https://icons8.com";
const editIcon = require('../../assets/edit-icon.png');
const {width, height} = Dimensions.get('window');

async function fetchPhotos(
  ad: Ad,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
  setError: Dispatch<React.SetStateAction<string | undefined>>,
) {
  try {
    const response = await adUtils.getPhotos(ad.photoAlbum);
    setPhotos(response);
    setError(undefined);
    setLoading(false);
  } catch (e) {
    setError(e as string);
    setLoading(false);
  }
}

function AdContainer() {
  const {ad} = useContext(AdContext);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [nameVisible, setNameVisible] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const photoIndex = React.useRef(0);

  React.useEffect(() => {
    fetchPhotos(ad, setPhotos, setLoading, setError);
  }, [ad]);

  return loading || error ? (
    <Status loading={loading} error={error} style={styles.statusContainer} />
  ) : (
    <View style={styles.listElement}>
      {nameVisible && (
        <View style={styles.listElementHeader}>
          <Text style={styles.listElementHeaderText}>{ad.pet.name}</Text>
        </View>
      )}
      <FlashList
        data={photos}
        estimatedItemSize={400}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        snapToInterval={width}
        initialScrollIndex={1}
        ListHeaderComponent={<InfoScreen setNameVisible={setNameVisible} />}
        ListFooterComponent={<AddPhotoScreen />}
        renderItem={({item, index}) => (
          <View style={styles.innerListElementContainer}>
            {/* @ts-ignore */}
            <FastImage
              style={styles.listElementImage}
              source={{uri: item.img.replace('.png', '.jpg')}}
            />
            {item.description && (
              <View style={styles.listElementTextContainer}>
                <Text style={styles.listElementText}>{item.description}</Text>
              </View>
            )}
            <Pressable
              style={styles.editIconContainer}
              onPressOut={() => {
                photoIndex.current = index;
                setEditModalVisible(true);
              }}>
              <Image source={editIcon} style={styles.editIcon} />
            </Pressable>
          </View>
        )}
      />
      <EditModal
        photos={photos}
        photoIndex={photoIndex.current}
        visible={editModalVisible}
        setVisible={setEditModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: height * 0.01,
  },
  listElementHeaderText: {
    fontSize: 50,
    fontStyle: 'italic',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {width: 1, height: 1.5},
    color: colorPalette.darkAccentColor,
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
    height: height * 0.76,
    width: width * 0.98,
    top: height * 0.1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  listElementTextContainer: {
    position: 'absolute',
    top: height * 0.7,
    maxWidth: width * 0.8,
    backgroundColor: colorPalette.lightAccentColor,
    borderRadius: 20,
    padding: 10,
  },
  listElementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AdContainer;
