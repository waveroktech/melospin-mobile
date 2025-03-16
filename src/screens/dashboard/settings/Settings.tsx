import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Header, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {SettingItem} from './components';
import theme from 'theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';

export const Settings = () => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();
  const [faceId, setFaceId] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [hideAccount, setHideAccount] = useState(false);

  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Account Settings" />

      <Box mt={hp(20)} mx={wp(16)}>
        <Box mt={hp(10)}>
          <Text
            pb={hp(10)}
            variant="body"
            fontSize={fontSz(14)}
            color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Notifications
          </Text>
          <SettingItem
            title="Push notifications"
            hasSwitch
            value={pushNotifications}
            setValue={() => setPushNotifications(!pushNotifications)}
          />
        </Box>

        <Box mt={hp(40)}>
          <Text
            variant="body"
            pb={hp(10)}
            fontSize={fontSz(14)}
            color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Privacy & Security
          </Text>
          <SettingItem
            title="Enable Face ID/ FingerPrint Login"
            hasSwitch
            value={faceId}
            setValue={() => setFaceId(!faceId)}
          />
          <SettingItem
            title="Hide account balance"
            hasSwitch
            value={hideAccount}
            setValue={() => setHideAccount(!hideAccount)}
          />
          <SettingItem
            title="Change password"
            onPress={() => navigate('ChangePassword')}
          />
        </Box>
      </Box>
    </Screen>
  );
};
