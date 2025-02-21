import {StyleSheet} from 'react-native';
import theme from 'theme';
import {deviceHeight, deviceWidth, fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  bgContainer: {
    width: deviceWidth,
    margin: 0,
    padding: 0,
    height: deviceHeight,
  },
  onboardingImage: {
    width: wp(400),
    height: hp(400),
  },
  titleText: {
    fontFamily: theme.font.AvenirNextMedium,
    fontSize: fontSz(14),
    textTransform: 'uppercase',
    color: theme.colors.TEXT_INPUT_PLACEHOLDER,
  },
  descriptionText: {
    fontFamily: theme.font.AvenirNextSemiBold,
    fontSize: fontSz(32),
    lineHeight: hp(38),
    paddingTop: hp(10),
    width: wp(330),
    color: theme.colors.ACCENT_04,
  },
  artistList: {
    width: wp(104.81),
    height: hp(32),
    marginTop: hp(20),
  },
});
