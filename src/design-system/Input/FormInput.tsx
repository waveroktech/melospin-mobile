import Text from 'design-system/Text';
import {Box} from '../Box';
import React, {forwardRef, useEffect, useRef} from 'react';
import {ActivityIndicator, TextStyle, TouchableOpacity} from 'react-native';
import {
  Easing,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {isIos} from 'utils/platform';
import {Icon} from 'shared';
import {useController} from 'react-hook-form';

interface FormTextInputProps extends RNTextInputProps {
  label?: string;
  value?: string;
  onFocus?: () => void;
  containerStyle?: ViewStyle;
  isLocked?: boolean;
  isPassword?: boolean;
  isDate?: boolean;
  show?: boolean;
  isDropDown?: boolean;
  onPressPasswordIcon?: () => void;
  onPressDropDown?: () => void;
  calender?: boolean;
  showCalendar?: () => void;
  labelStyle?: TextStyle;
  control: any;
  errorText?: string;
  name: string;
  inputTextStyle?: ViewStyle;
  dropDownStyle?: ViewStyle;
  isLoading?: boolean;
  keyboardType?: RNTextInputProps['keyboardType'];
  disablePasswordPrevention?: boolean;
}

export const FormInput = forwardRef<RNTextInput, FormTextInputProps>(
  (
    {
      errorText,
      label,
      isDropDown,
      onPressDropDown,
      isPassword,
      control,
      value,
      name,
      onPressPasswordIcon,
      containerStyle,
      labelStyle,
      inputTextStyle,
      isDate,
      dropDownStyle,
      isLoading,
      keyboardType,
      disablePasswordPrevention,
      ...props
    },
    ref,
  ) => {
    const {field} = useController({control, defaultValue: '', name});
    const animatedValue = useRef(new Animated.Value(0));

    // Determine autoComplete and textContentType based on input type
    const getAutoCompleteValue = (): RNTextInputProps['autoComplete'] => {
      if (disablePasswordPrevention) {
        return undefined;
      }
      if (isPassword) {
        return 'off';
      }
      if (keyboardType === 'email-address') {
        return 'off';
      }
      return 'off'; // Default to off to prevent saved passwords
    };

    const getTextContentType = (): RNTextInputProps['textContentType'] => {
      if (disablePasswordPrevention) {
        return undefined;
      }
      if (isPassword) {
        return 'none';
      }
      if (keyboardType === 'email-address') {
        return 'none';
      }
      return 'none'; // Default to none to prevent saved passwords
    };

    useEffect(() => {
      // Set initial animation state based on field value
      if (field.value) {
        animatedValue.current.setValue(1);
      } else {
        animatedValue.current.setValue(0);
      }
    }, [field.value]);

    const returnAnimatedTitleStyles = {
      transform: [
        {
          translateY: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [isIos ? hp(18) : hp(20), hp(8)],
            extrapolate: 'clamp',
          }),
        },
      ],
      fontSize: animatedValue?.current?.interpolate({
        inputRange: [0, 1],
        outputRange: [fontSz(14), fontSz(10)],
        extrapolate: 'clamp',
      }),
      color: animatedValue?.current?.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.WHITE, theme.colors.WHITE],
      }),
    };

    const viewStyles = {
      borderColor: animatedValue?.current?.interpolate({
        inputRange: [0, 1],
        outputRange: [
          theme.colors.ACCENT_04,
          errorText ? theme.colors.ERROR_TONE : theme.colors.ACCENT_04,
        ],
      }),
      borderWidth: animatedValue?.current?.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
    const onFocus = () => {
      Animated.timing(animatedValue?.current, {
        toValue: 1,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.1, 1),
        useNativeDriver: false,
      }).start();
    };

    const onBlur = () => {
      if (!field.value) {
        Animated.timing(animatedValue?.current, {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0.4, 0.0, 0.1, 1),
          useNativeDriver: false,
        }).start();
      }
      if (field.value) {
        Animated.timing(animatedValue?.current, {
          toValue: 1,
          duration: 500,
          easing: Easing.bezier(0.4, 0.0, 0.1, 1),
          useNativeDriver: false,
        }).start();
      }
    };

    return (
      <>
        <Box flexDirection={'row'}>
          <TouchableOpacity
            activeOpacity={isDropDown || isDate ? 0.8 : 1}
            onPressIn={() => {
              isDropDown || isDate
                ? onPressDropDown && onPressDropDown()
                : null;
            }}>
            <Animated.View
              style={[
                styles.subContainer,
                containerStyle,
                viewStyles,
                errorText && errorText ? styles.errorContainer : null,
              ]}>
              <Animated.Text
                onPress={() => onFocus()}
                style={[
                  returnAnimatedTitleStyles,
                  styles.labelStyle,
                  labelStyle,
                ]}>
                {label}
              </Animated.Text>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <RNTextInput
                  onChangeText={field.onChange}
                  value={isDate ? value : field.value}
                  style={[styles.textStyle, inputTextStyle]}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  selectionColor={theme.colors.WHITE}
                  pointerEvents={isDropDown || isDate ? 'none' : 'auto'}
                  autoComplete={getAutoCompleteValue()}
                  textContentType={getTextContentType()}
                  {...{ref}}
                  {...props}
                />
                {isPassword && (
                  <Box
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    style={styles.rightActionContainer}
                    onPress={onPressPasswordIcon}>
                    <Icon name="eye-open" />
                  </Box>
                )}
                {isDropDown && (
                  <Box
                    style={[styles.rightActionContainer, dropDownStyle]}
                    as={TouchableOpacity}
                    onPress={() => {
                      onPressDropDown && onPressDropDown();
                      onFocus();
                    }}
                    activeOpacity={0.8}>
                    <Icon name="chevron-down" />
                  </Box>
                )}

                {isDate && (
                  <Box
                    style={[styles.rightActionContainer, dropDownStyle]}
                    as={TouchableOpacity}
                    onPress={() => {
                      onPressDropDown && onPressDropDown();
                      onFocus();
                    }}
                    activeOpacity={0.8}>
                    <Icon name="calendar" color={theme.colors.WHITE} />
                  </Box>
                )}

                {isLoading && (
                  <Box>
                    <ActivityIndicator
                      size={'small'}
                      color={theme.colors.WHITE}
                    />
                  </Box>
                )}
              </Box>
            </Animated.View>
          </TouchableOpacity>
        </Box>
        <Box flexDirection={'row'}>
          {errorText && (
            <Text variant="body" bottom={hp(16)} color="red">
              {errorText}
            </Text>
          )}
        </Box>
      </>
    );
  },
);

const styles = StyleSheet.create({
  subContainer: {
    paddingHorizontal: wp(20),
    backgroundColor: theme.colors.TEXT_INPUT_BG,
    width: wp(340),
    height: hp(56),
    borderRadius: hp(24),
    marginBottom: hp(24),
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: theme.colors.ERROR_TONE,
    zIndex: 1,
  },
  textStyle: {
    fontSize: hp(16),
    height: hp(50),
    width: wp(230),
    bottom: hp(0),
    color: theme.colors.WHITE,
    fontFamily: theme.font.AvenirNextRegular,
  },
  labelStyle: {
    fontFamily: theme.font.AvenirNextMedium,
  },
  rightActionContainer: {
    top: hp(0),
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
