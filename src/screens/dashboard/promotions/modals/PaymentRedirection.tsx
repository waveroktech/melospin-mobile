import React from 'react';
import {Box, Button, Text} from 'design-system';
import Modal from 'react-native-modal';
import {Animated, Easing, Image} from 'react-native';
import theme from 'theme';
import {styles} from './style';
import {fontSz, hp, wp} from 'utils';

interface PaymentRedirectionProps {
  isVisible: boolean;
  onClose: () => void;
  isLoading: boolean;
}

export const PaymentRedirection = ({
  isLoading,
  onClose,
  isVisible,
}: PaymentRedirectionProps) => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 1],
    outputRange: ['0deg', '360deg', '0deg'],
  });

  const controller = new AbortController();

  const cancelPayment = async () => {
    controller.abort();
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <Box
        width={wp(352)}
        alignSelf={'center'}
        height={hp(362)}
        p={20}
        py={hp(60)}
        alignItems={'center'}
        bg={theme.colors.ACCENT_04}
        borderRadius={hp(30)}>
        {isLoading ? (
          <Animated.Image
            source={theme.images.loading}
            style={[styles.loadingImage, {transform: [{rotate: spin}]}]}
          />
        ) : (
          <Image
            source={theme.images.loading}
            resizeMode="contain"
            style={styles.loadingImage}
          />
        )}
        <Text
          variant="bodyBold"
          pt={hp(20)}
          fontSize={fontSz(24)}
          textAlign={'center'}>
          Redirecting to payment gateway
        </Text>
        <Text pt={hp(20)} color={theme.colors.BLACK_DEFAULT}>
          Tap cancel if you don’t wish to continue
        </Text>

        <Button
          hasIcon
          width={wp(150)}
          hasBorder
          title="Cancel"
          onPress={cancelPayment}
        />
      </Box>
    </Modal>
  );
};
