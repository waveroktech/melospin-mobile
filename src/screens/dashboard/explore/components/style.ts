import {StyleSheet} from 'react-native';
import theme from 'theme';
import {hp, wp} from 'utils';

export const styles = StyleSheet.create({
  boxContainer: {
    width: wp(343),
    height: hp(143),
    borderWidth: 1,
    marginTop: hp(20),
    alignSelf: 'center',
    borderRadius: hp(24),
    borderColor: theme.colors.BASE_SECONDARY,
  },
  headphones: {
    width: wp(343),
    height: hp(143),
    position: 'absolute',
    top: hp(19),
    zIndex: -11,
  },
  gradientContainer: {
    borderWidth: 0.91,
    borderRadius: 100,
    height: hp(32),
    width: wp(120),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGradientContainer: {
    borderWidth: 0.91,
    borderRadius: 100,
    height: hp(37),
    width: wp(103),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
    borderWidth: 0.9,
    borderColor: theme.colors.OFF_BLACK_100,
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
  },
  djProfileImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.OFF_WHITE_300,
  },
  djProfileContainer: {
    width: wp(51),
    height: hp(34),
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: hp(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
