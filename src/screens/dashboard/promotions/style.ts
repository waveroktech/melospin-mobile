import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  searchInputContainer: {
    borderWidth: 1,
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
  contentContainerStyle: {
    marginTop: hp(20),
    paddingBottom: hp(100),
  },
  flatListContainer: {
    height: hp(500),
  },
  optionContainer: {
    width: 56,
    height: 56,
    borderRadius: 24,
    backgroundColor: theme.colors.BASE_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    width: wp(270),
    marginBottom: 0,
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
  textDecoration: {
    textDecorationLine: 'underline',
  },
});
