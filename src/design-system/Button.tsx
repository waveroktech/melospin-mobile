import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Box, BoxProps, Text} from 'design-system';
import theme from 'theme';
import {fontSz, getBottomSpace, hp, wp} from 'utils';
import {Icon} from 'shared';

interface Props extends BoxProps {
  title?: string;
  disabled?: boolean;
  textColor?: string;
  textVariant?: any;
  backgroundColor?: string;
  hasIcon?: boolean;
  loading?: boolean;
  isNotBottom?: boolean;
  containerStyle?: ViewStyle;
  loadingColor?: string;
  hasBackIcon?: string;
  fontStyle?: TextStyle;
  hasBorder?: boolean;
  buttonStyle?: ViewStyle;
  borderColor?: string;
}

export const Button = ({
  title,
  disabled,
  textColor,
  textVariant,
  backgroundColor,
  loading,
  isNotBottom,
  containerStyle,
  loadingColor,
  fontStyle,
  hasBorder,
  buttonStyle,
  borderColor,
  hasIcon,
  ...props
}: Props) => {
  return (
    <Box style={!isNotBottom && [styles.containerStyle, containerStyle]}>
      <Box
        disabled={disabled}
        activeOpacity={0.8}
        as={TouchableOpacity}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderRadius={hp(24)}
        height={hp(56)}
        width={wp(344)}
        backgroundColor={
          disabled
            ? theme.colors.ACCENT_04
            : backgroundColor || theme.colors.PRIMARY
        }
        borderColor={borderColor || theme.colors.LIGHT_PRIMARY}
        style={[hasBorder && styles.borderStyle, buttonStyle]}
        {...props}>
        <Box width={'90%'}>
          {loading ? (
            <ActivityIndicator
              size={'small'}
              color={loadingColor || theme.colors.WHITE}
            />
          ) : (
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={hasIcon ? 'center' : 'space-between'}>
              <Text
                color={disabled ? theme.colors.WHITE : textColor || 'white'}
                variant={textVariant || 'bodyMedium'}
                fontSize={fontSz(14)}
                style={fontStyle}>
                {title}
              </Text>
              {hasIcon ? null : <Icon name="button-icon" />}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: hp(40) + getBottomSpace(),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  borderStyle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
  },
});
