import React from 'react';
import {Box} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import WebView from 'react-native-webview';
import {hp} from 'utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabStackParamList, DashboardStackParamList} from 'types';
import {showMessage} from 'react-native-flash-message';

interface WebviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  url: string;
}
export const WebviewModal = ({isVisible, onClose, url}: WebviewModalProps) => {
  const {navigate} =
    useNavigation<
      NavigationProp<DashboardStackParamList & BottomTabStackParamList>
    >();

  const onNavigationStateChange = (navState: {
    canGoForward: any;
    canGoBack: any;
    title: any;
    url: any;
  }) => {
    const {url} = navState;
    if (url?.includes('http://13.48.183.216:3600/payments/verify-payment')) {
      onClose();
      showMessage({
        message: 'Payment successful',
        type: 'success',
        duration: 2000,
      });
      setTimeout(() => {
        //@ts-ignore
        navigate('Dashboard');
      }, 400);
    }
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader modalHeaderText="Payment Checkout" onClose={onClose} />
        <WebView
          source={{uri: url}}
          style={{padding: hp(20)}}
          onNavigationStateChange={onNavigationStateChange}
        />
      </Box>
    </BaseModal>
  );
};
