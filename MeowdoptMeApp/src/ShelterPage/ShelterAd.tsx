import { FlashList } from '@shopify/flash-list';
const { width, height } = Dimensions.get('window');
import React, { Dispatch } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { ShelterContext } from '../Context';
import { shelters } from '../sampleData/sheltersPhotos';
import FastImage from 'react-native-fast-image';
import InfoScreen from './InfoScreen';
import colorPalette from '../../assets/colors';
import { Photo, Shelter } from '../commonTypes';
import adUtils from '../AdsPage/adUtils';
import Status from '../components/Status';

async function fetchPhotos(
    shelterPhotoAlbumId: number,
    setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
    setLoading: Dispatch<React.SetStateAction<boolean>>,
    setError: Dispatch<React.SetStateAction<string | undefined>>,
) {
    try {
        const response = await adUtils.getPhotos(shelterPhotoAlbumId);
        console.log(response);
        setPhotos(response);
        setError(undefined);
        setLoading(false);
    } catch (e) {
        setError(e as string);
        setLoading(false);
    }
}


function ShelterAd() {

    const { shelter: contextShelter } = React.useContext(ShelterContext);
    const shelter = contextShelter!;
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const photo = React.useRef<Photo>(undefined as any);


    const data = shelters?.find(item => {
        return (item.id === shelter?.id)
    })!;


    React.useEffect(() => {
        console.log("shelter", shelter);
        console.log("contextShelter", contextShelter);

        fetchPhotos(shelter.photoAlbum, setPhotos, setLoading, setError);
    }, [shelter]);

    console.log(photos);


    return loading || error ? (
        <Status loading={loading} error={error} style={styles.statusContainer} />
    ) : (
        <View style={styles.innerListElementContainer}>
            <View style={styles.listElementHeader}>
                <Text style={styles.listElementHeaderText}>{shelter?.name}</Text>
            </View>
            <FlashList
                data={photos}
                estimatedItemSize={400}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={'center'}
                decelerationRate={'normal'}
                snapToInterval={width}
                initialScrollIndex={1}
                ListHeaderComponent={InfoScreen}
                renderItem={({ item }) => (
                    <View style={styles.innerListElementContainer}>
                        {/* @ts-expect-error Source is defined as string but we hax */}
                        <FastImage style={styles.listElementImage} source={item.img} />
                    </View>
                )}
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
    listElementImage: {
        position: 'absolute',
        height: height * 0.71,
        width: width * 0.98,
        top: height * 0.15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
    listElementHeader: {
        borderRadius: 20,
        backgroundColor: colorPalette.lightAccentColor,
        overflow: 'hidden',
        position: 'absolute',
        top: height * 0.05,
    },
    listElementHeaderText: {
        fontSize: 27,
        fontStyle: 'italic',
        textShadowColor: 'black',
        textShadowRadius: 3,
        textShadowOffset: { width: 1, height: 1.5 },
        color: colorPalette.darkAccentColor,
    },
    innerListElementContainer: {
        backgroundColor: colorPalette.backgroundColor,
        height: height,
        width: width,
        alignItems: 'center',
    },
})

export default ShelterAd;