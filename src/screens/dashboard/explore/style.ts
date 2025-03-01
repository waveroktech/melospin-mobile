import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  searchInputContainer: {
    borderColor: theme.colors.OFF_WHITE_200,
    height: hp(56),
    marginHorizontal: wp(16),
    borderRadius: hp(16),
    borderWidth: 1,
    backgroundColor: theme.colors.TEXT_INPUT_BG,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(16),
  },
  searchTextInput: {
    height: hp(56),
    width: wp(250),
    fontFamily: theme.font.AvenirNextRegular,
    color: theme.colors.WHITE,
    fontSize: fontSz(16),
    marginLeft: wp(10),
  },
  contentContainerStyle: {
    marginTop: hp(30),
    marginHorizontal: wp(16),
    paddingBottom: hp(200),
  },
});
