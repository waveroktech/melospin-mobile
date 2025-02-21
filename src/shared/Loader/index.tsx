import {Animated, Easing, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from 'utils';
import {Box} from 'design-system';
import theme from 'theme';

export function Loader(props: {
  loading: boolean;
  fullPageLoaderStyle?: ViewStyle;
}) {
  const {loading, fullPageLoaderStyle} = props;

  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 1],
    outputRange: ['0deg', '360deg', '0deg'],
  });

  return loading ? (
    <View style={[styles.fullPageLoader, fullPageLoaderStyle]}>
      <Box
        height={deviceHeight - 100}
        justifyContent={'center'}
        alignItems={'center'}>
        <Animated.Image
          source={theme.images.spinner}
          style={[styles.loadingImage, {transform: [{rotate: spin}]}]}
        />
      </Box>
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  fullPageLoader: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1E1FB2',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loadingImage: {
    width: 79,
    height: 79,
  },
});
