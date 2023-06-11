import { FlashList } from '@shopify/flash-list';
const { width, height } = Dimensions.get('window');
import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { ShelterContext } from '../Context';
import { shelters } from '../sampleData/sheltersPhotos';
import FastImage from 'react-native-fast-image';
import InfoScreen from './InfoScreen';
import colorPalette from '../../assets/colors';


function ShelterAd() {

    const { shelter } = React.useContext(ShelterContext);

    const data = shelters?.find(item => {
        return (item.id === shelter?.id)
    })!;


    return (
        <View style={styles.innerListElementContainer}>
            <View style={styles.listElementHeader}>
                <Text style={styles.listElementHeaderText}>{shelter?.name}</Text>
            </View>
            <FlashList
                data={data.photoAlbum.photos}
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