import {StyleSheet} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

export const styles = StyleSheet.create({
  cellRoot: {
    backgroundColor: theme.colors.TEXT_INPUT_BG,
    borderRadius: hp(15),
    width: wp(48),
    height: hp(52),
    alignItems: 'center',
    justifyContent: 'center',
  },

  cellText: {
    textAlign: 'center',
    ...theme.typography.bodyMedium,
    color: theme.colors.WHITE,
    fontSize: fontSz(16),
  },
  codeFieldRoot: {
    marginTop: hp(16),
  },
  focusInput: {
    borderWidth: hp(1),
    borderColor: theme.colors.WHITE,
    borderRadius: hp(15),
  },

  focusCell: {
    borderColor: '#000',
  },
  otpInfoContainer: {
    height: hp(50),
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: fontSz(14),
    fontFamily: theme.font.AvenirNextMedium,
    color: theme.colors.WHITE,
  },
});
