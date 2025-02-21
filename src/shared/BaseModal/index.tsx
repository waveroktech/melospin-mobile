import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import {Box} from 'design-system';
import theme from 'theme';

interface BaseModalProps {
  visible?: boolean;
  children: any;
  onClose?: () => void;
  containerStyles?: any;
  removeBackTap?: boolean;
  dialogContainerStyle?: ViewStyle;
  onModalHide?: () => void;
}

export const BaseModal = ({
  visible,
  children,
  onClose,
  containerStyles,
  removeBackTap,
  dialogContainerStyle,
  onModalHide,
}: BaseModalProps) => {
  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationOutTiming={400}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={[styles.container, containerStyles]}
      propagateSwipe={true}
      backdropOpacity={0.8}
      onModalHide={onModalHide}
      onBackdropPress={removeBackTap ? () => {} : onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
          style={styles.generalContainer}
          pointerEvents="box-none">
          <Box
            style={[styles.dialogContainer, dialogContainerStyle]}
            bg={theme.colors.BLACK}>
            {children}
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
