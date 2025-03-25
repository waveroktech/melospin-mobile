import {StyleSheet} from 'react-native';
import {deviceWidth, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  icon: {
    width: wp(20),
    height: hp(20),
  },
  gradientContainer: {
    width: deviceWidth - wp(16),
    borderRadius: hp(24),
    height: hp(145),
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: hp(24),
  },
  imageContainer: {
    width: deviceWidth - wp(16),
    height: hp(145),
    borderRadius: hp(24),
  },
  profileImageContainer: {
    borderWidth: 2,
    width: wp(100),
    borderRadius: 100,
    height: hp(102),
    bottom: hp(-30),
    overflow: 'hidden',
    position: 'absolute',
  },
  djProfileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    top: 0.5,
    borderRadius: 100,
  },
  barcode: {
    width: wp(160),
    height: hp(166),
    alignSelf: 'center',
    marginTop: hp(20),
  },
});
