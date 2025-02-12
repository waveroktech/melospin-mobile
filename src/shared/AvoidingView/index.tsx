import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const AvoidingView = ({children}: Props) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
