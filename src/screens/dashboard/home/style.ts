import {StyleSheet} from 'react-native';
import theme from 'theme';
import {hp, wp} from 'utils';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: hp(20),
  },
  trendingImage: {
    width: wp(350),
    height: hp(140),
    marginTop: hp(10),
  },
  gradientContainer: {
    borderWidth: 1,
    borderRadius: hp(24),
    marginTop: hp(20),
    backgroundColor: theme.colors.OFF_BLACK_100,
    height: hp(232),
    width: wp(343),
    overflow: 'hidden',
  },
  djProfile: {
    width: 56,
    height: 56,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.OFF_BLACK_100,
  },
});
