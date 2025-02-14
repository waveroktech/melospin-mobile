/* eslint-disable react/no-unstable-nested-components */
import React, {forwardRef, useRef} from 'react';
import FlashMessage from 'react-native-flash-message';
import theme from 'theme';
import {FlashMessageItem} from './components';

export const FlashMessageToast = forwardRef(({}, ref) => {
  const flashMessage = useRef<FlashMessage>();

  return (
    <FlashMessage
      //@ts-ignore
      ref={ref || flashMessage}
      position={'top'}
      duration={3000}
      MessageComponent={({message}: any) => {
        if (message?.type === 'danger') {
          return (
            <FlashMessageItem
              message={message?.message}
              icon="error-alert"
              bgColor={theme.colors.ERROR_TONE}
              borderColor={theme.colors.DANGER_BORDER}
              closeMessage={() =>
                //@ts-ignore
                ref?.current?.hideMessage() ||
                flashMessage.current?.hideMessage()
              }
            />
          );
        } else if (message?.type === 'success') {
          return (
            <FlashMessageItem
              bgColor={theme.colors.SUCCESS_TONE}
              message={message?.message}
              icon="success-alert"
              borderColor={theme.colors.GREEN_BORDER}
              messageTextColor={theme.colors.GREEN_TEXT}
              closeMessage={() =>
                //@ts-ignore
                ref?.current?.hideMessage() ||
                flashMessage.current?.hideMessage()
              }
            />
          );
        } else if (message?.type === 'info') {
          <FlashMessageItem
            message={message?.message}
            bgColor={theme.colors.WARNING_TONE}
            icon="info-alert"
            borderColor={theme.colors.WARNING_BORDER}
            messageTextColor={theme.colors.WARNING_BORDER}
            closeMessage={() =>
              //@ts-ignore
              ref?.current?.hideMessage() || flashMessage.current?.hideMessage()
            }
          />;
        }
      }}
    />
  );
});
