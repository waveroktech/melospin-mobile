import {StyleSheet} from 'react-native';
import theme from 'theme';
import {deviceWidth, hp} from 'utils';

export const styles = StyleSheet.create({
  imageBg: {
    width: deviceWidth,
    height: hp(309),
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.OFF_WHITE_300,
  },
  artistList: {
    width: 46,
    height: 24,
  },
});
