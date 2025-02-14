import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  activeProfileContainer: {
    borderWidth: 1,
    borderColor: theme.colors.WHITE,
    height: hp(277),
    backgroundColor: theme.colors.PRIMARY,
    width: wp(212),
    borderRadius: hp(24),
    paddingTop: hp(10),
  },
  inactiveProfileContainer: {
    zIndex: -10000,
    position: 'absolute',
    borderRadius: hp(24),
    paddingTop: hp(10),
    left: -wp(70),
    width: wp(188),
    height: hp(246),
    top: hp(20),
    opacity: 0.5,
    borderBottomColor: theme.colors.WHITE,
    backgroundColor: '#FFFFFF33',
  },
  inactiveProfileContainer2: {
    zIndex: -10000,
    position: 'absolute',
    left: -wp(70),
    borderRadius: hp(24),
    paddingTop: hp(10),
    width: wp(188),
    height: hp(246),
    top: hp(20),
    opacity: 0.5,
    borderBottomColor: theme.colors.WHITE,
    backgroundColor: '#FFFFFF33',
  },
  inactiveImage: {
    width: wp(168),
    height: hp(183),
    borderRadius: 15,
    alignSelf: 'center',
  },
  image: {
    width: wp(192),
    height: hp(205),
    borderRadius: 15,
    alignSelf: 'center',
  },
  profileText: {
    textAlign: 'center',
    paddingTop: hp(20),
    fontFamily: theme.font.AvenirNextMedium,
    fontSize: fontSz(14),
    color: theme.colors.WHITE,
  },
  descriptionText: {
    fontFamily: theme.font.AvenirNextRegular,
    fontSize: fontSz(14),
    paddingLeft: wp(20),
    color: theme.colors.TEXT_INPUT_PLACEHOLDER,
  },
});
