import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  promotionContainer: {
    backgroundColor: theme.colors.OFF_BLACK_100,
    paddingVertical: hp(8),
    paddingHorizontal: wp(16),
    borderRadius: hp(24),
    marginBottom: hp(16),
    marginHorizontal: wp(16),
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
  searchInputContainer: {
    borderColor: theme.colors.OFF_WHITE_200,
    height: hp(56),
    borderRadius: hp(24),
    backgroundColor: theme.colors.TEXT_INPUT_BG,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(16),
  },
  searchTextInput: {
    height: hp(56),
    width: wp(250),
    fontFamily: theme.font.DMSansRegular,
    color: theme.colors.WHITE,
    fontSize: fontSz(16),
    marginLeft: wp(12),
  },
  transactionImage: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionImageStyle: {
    borderRadius: 8,
  },
  filterContainer: {
    borderWidth: 1,
    marginTop: wp(16),
    borderColor: theme.colors.BASE_SECONDARY,
    borderRadius: hp(24),
    padding: hp(12),
    marginRight: wp(8),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
