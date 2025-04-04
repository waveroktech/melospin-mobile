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
  iconName?: string;
  isLoading?: boolean;
  icon?: string;
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
  iconName,
  isLoading,
  icon,
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
            ? theme.colors.PRIMARY_200
            : backgroundColor || theme.colors.PRIMARY
        }
        borderColor={borderColor || theme.colors.LIGHT_PRIMARY}
        style={[
          hasBorder && styles.borderStyle,
          disabled && styles.disabledStyle,
          buttonStyle,
        ]}
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
              <Box flexDirection={'row'} alignItems={'center'}>
                {icon && <Icon name={icon} />}
                <Text
                  color={disabled ? theme.colors.WHITE : textColor || 'white'}
                  variant={textVariant || 'bodyMedium'}
                  fontSize={fontSz(14)}
                  style={fontStyle}>
                  {title}
                </Text>
              </Box>
              {isLoading ? (
                <ActivityIndicator
                  size={'small'}
                  color={loadingColor || theme.colors.WHITE}
                />
              ) : (
                <>
                  {hasIcon ? null : <Icon name={iconName || 'button-icon'} />}
                </>
              )}
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
  disabledStyle: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});
