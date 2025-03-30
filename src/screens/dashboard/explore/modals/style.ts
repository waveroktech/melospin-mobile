import {StyleSheet} from 'react-native';
import theme from 'theme';
import {hp, wp} from 'utils';

export const styles = StyleSheet.create({
  imageProfile: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  gradientContainer: {
    borderWidth: 0.91,
    borderRadius: 100,
    height: hp(37),
    width: wp(94),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.BASE_PRIMARY,
    overflow: 'hidden',
  },
});
