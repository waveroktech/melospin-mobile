import {StyleSheet} from 'react-native';
import theme from 'theme';
import {deviceWidth, fontSz, hp, wp} from 'utils';

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
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.OFF_WHITE_300,
  },
  imageBg: {
    width: deviceWidth,
    height: hp(309),
  },
});
