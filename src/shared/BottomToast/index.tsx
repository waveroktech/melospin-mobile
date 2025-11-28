import React, {useEffect, useRef} from 'react';
import {Box, Text} from 'design-system';
import {Animated, StyleSheet} from 'react-native';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from '../Icon';

interface BottomToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

export const BottomToast = ({
  visible,
  message,
  type = 'success',
  duration = 3000,
  onHide,
}: BottomToastProps) => {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  if (!visible) {
    return null;
  }

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: theme.colors.SUCCESS_TONE,
          borderColor: theme.colors.GREEN_BORDER,
          textColor: theme.colors.GREEN_TEXT,
          icon: 'success-alert' as const,
        };
      case 'error':
        return {
          bgColor: theme.colors.ERROR_TONE,
          borderColor: theme.colors.DANGER_BORDER,
          textColor: theme.colors.WHITE,
          icon: 'error-alert' as const,
        };
      case 'info':
        return {
          bgColor: theme.colors.WARNING_TONE,
          borderColor: theme.colors.WARNING_BORDER,
          textColor: theme.colors.WARNING_BORDER,
          icon: 'info-alert' as const,
        };
      default:
        return {
          bgColor: theme.colors.SUCCESS_TONE,
          borderColor: theme.colors.GREEN_BORDER,
          textColor: theme.colors.GREEN_TEXT,
          icon: 'success-alert' as const,
        };
    }
  };

  const toastStyles = getToastStyles();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: slideAnim}],
          opacity: opacityAnim,
        },
      ]}>
      <Box
        backgroundColor={toastStyles.bgColor}
        borderWidth={1}
        borderColor={toastStyles.borderColor}
        mx={wp(16)}
        mb={hp(20)}
        justifyContent={'center'}
        px={wp(16)}
        minHeight={hp(56)}
        borderRadius={hp(16)}
        flexDirection={'row'}
        alignItems={'center'}>
        <Icon name={toastStyles.icon} />
        <Box ml={wp(12)} flex={1}>
          <Text
            variant="body"
            fontSize={fontSz(14)}
            color={toastStyles.textColor}>
            {message}
          </Text>
        </Box>
      </Box>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
