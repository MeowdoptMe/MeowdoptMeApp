import { FlashList } from '@shopify/flash-list';
const { width, height } = Dimensions.get('window');
import React from 'react';
import { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { ShelterContext } from './Context';
import { Photo } from './commonTypes';
import { shelters } from './sampleData/sheltersPhotos';
import FastImage from 'react-native-fast-image';


function ShelterAd() {

    const { shelter } = React.useContext(ShelterContext);

    const data = shelters?.find(item => {
        console.log('item.id === shelter?.id', item.id, shelter?.id, item.id === shelter?.id)
        return (item.id === shelter?.id)
    })!;

    console.log('data', data);


    return (
        <FlashList
            data={data.photoAlbum.photos}
            estimatedItemSize={400}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={'center'}
            decelerationRate={'normal'}
            snapToInterval={width}
            renderItem={({ item }) => (
                <View style={styles.innerListElementContainer}>
                    {/* @ts-expect-error Source is defined as string but we hax */}
                    <FastImage style={styles.listElementImage} source={item.img} />
                </View>
            )}
        />
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
    innerListElementContainer: {
        height: height,
        width: width,
        alignItems: 'center',
    },
})

export default ShelterAd;