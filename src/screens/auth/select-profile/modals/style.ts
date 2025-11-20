import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  searchInputContainer: {
    borderColor: theme.colors.OFF_WHITE_200,
    height: hp(56),
    marginHorizontal: wp(16),
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
    marginTop: hp(24),
  },
  loadingImage: {
    width: 64,
    height: 64,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  gradientContainer: {
    borderWidth: 0.91,
    borderRadius: 100,
    height: 40,
    width: 144,
    paddingLeft: wp(4),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.OFF_BLACK_100,
  },
  imageContainer: {
    marginRight: wp(4),
    width: 32,
    height: 32,
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: theme.colors.WHITE,
    borderRadius: 100,
  },
});
