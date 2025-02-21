import {StyleSheet, Dimensions} from 'react-native';
import theme from 'theme';
import {hp} from 'utils';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
  generalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  dialogContainer: {
    borderTopRightRadius: hp(24),
    borderTopLeftRadius: hp(24),
    width: '100%',
    borderTopWidth: hp(1),
    borderColor: theme.colors.ACCENT_04,
    maxHeight: screen.height - 100,
    alignSelf: 'flex-end',
    position: 'relative',
  },
});

export default styles;
