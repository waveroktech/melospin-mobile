import {StyleSheet} from 'react-native';
import {hp, wp} from 'utils';

export const styles = StyleSheet.create({
  gradientContainer: {
    borderWidth: 0.91,
    borderRadius: 100,
    height: 32,
    width: 32,
    overflow: 'hidden',
  },
  imageContainer: {
    width: wp(30),
    height: hp(30),
    borderRadius: 100,
  },
  coverImage: {
    width: wp(120),
    height: hp(120),
    borderRadius: 20,
  },
});
