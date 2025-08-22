import {StyleSheet} from 'react-native';
import theme from 'theme';
import {deviceWidth, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  imageBg: {
    width: deviceWidth,
    height: hp(309),
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.OFF_WHITE_300,
  },
  profileImageContainer: {
    borderWidth: 2,
    width: wp(100),
    borderRadius: 100,
    height: hp(102),
    bottom: hp(-30),
    left: wp(10),
    overflow: 'hidden',
    position: 'absolute',
  },
  djProfileImage2: {
    width: wp(100),
    height: hp(102),
    alignSelf: 'center',
    borderRadius: 100,
  },
  djProfileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    top: 0.5,
    borderRadius: 100,
  },
  artistList: {
    width: 46,
    height: 24,
  },
  gradientContainer: {
    width: wp(343),
    borderRadius: hp(24),
    height: hp(145),
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    width: wp(343),
    height: hp(145),
    borderRadius: hp(24),
  },
  imageStyle: {
    borderRadius: hp(24),
  },
});
