import {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import colorPalette from '../../assets/colors';

const indicatorImage = require('../../assets/loading-indicator.png');

const {width} = Dimensions.get('window');

interface StatusProps {
  loading: boolean;
  error: string | undefined;
}

function Status({loading, error}: StatusProps) {
  return (
    <View style={styles.statusBox}>
      <LoadingIndicator loading={loading} />
      <Text style={styles.statusErrorText}>{error && `Woof! ${error}`}</Text>
    </View>
  );
}

interface LoadingIndicatorProps {
  loading: boolean;
}
function LoadingIndicator({loading}: LoadingIndicatorProps) {
  const spin = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 27,
      borderWidth: 2,
      borderStyle: 'dotted',
      backgroundColor: colorPalette.lightAccentColor,
      transform: [{rotate: `${spin.value}deg`}],
    };
  });

  if (loading) {
  }
  useEffect(() => {
    if (loading) {
      spin.value = withRepeat(
        withTiming(360, {duration: 900, easing: Easing.inOut(Easing.sin)}),
        -1,
      );
    } else {
      const currentSpin = spin.value;
      spin.value = withTiming(0, {
        duration: currentSpin * 10,
        easing: Easing.inOut(Easing.sin),
      });
    }
  }, [loading, spin]);
  return (
    <Animated.View style={animatedStyle}>
      <Animated.Image
        style={styles.loadingIndicator}
        // https://icons8.com/license
        source={indicatorImage}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  statusBox: {
    height: 100,
    maxWidth: width - 20,
    alignItems: 'center',
  },
  statusErrorText: {
    marginTop: 5,
    color: 'red',
    textAlign: 'center',
    maxWidth: width - 20,
  },
  statusLoadingText: {
    color: 'grey',
    textAlign: 'center',
  },
  loadingIndicator: {
    maxHeight: 50,
    maxWidth: 50,
    borderRadius: 25,
  },
});

export default Status;
