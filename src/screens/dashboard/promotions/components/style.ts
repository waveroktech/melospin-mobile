import {StyleSheet} from 'react-native';
import theme from 'theme';
import {hp, wp} from 'utils';

export const styles = StyleSheet.create({
  promotionContainer: {
    backgroundColor: theme.colors.OFF_BLACK_100,
    paddingVertical: hp(8),
    paddingHorizontal: wp(16),
    borderRadius: hp(24),
    marginBottom: hp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sharedList: {
    width: 50,
    height: 22,
  },
  promotionImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
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
});
