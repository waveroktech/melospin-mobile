import React, {useEffect, useState} from 'react';
import {Box, Text} from 'design-system';
import {Header, Loader, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {SettingItem} from './components';
import theme from 'theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {useMelospinStore, useUpdateUserPreferences} from 'store';
import {queryClient} from 'services/api';
import {showMessage} from 'react-native-flash-message';

export const Settings = () => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();
  const [faceId, setFaceId] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [hideAccount, setHideAccount] = useState(false);

  const {userData, userInfo} = useMelospinStore();

  console.log(userInfo?.accountPreference, 'userInfo');

  useEffect(() => {
    if (userInfo?.accountPreference) {
      setFaceId(userInfo?.accountPreference?.enableBioLogin);
      setPushNotifications(userInfo?.accountPreference?.allowPushNotification);
      setHideAccount(userInfo?.accountPreference?.hideAccountBalance);
    }
  }, [userInfo?.accountPreference]);

  const {mutate: updateUserPreferences, isPending} = useUpdateUserPreferences({
    onSuccess: (data: any) => {
      if (data?.status === 'success') {
        queryClient.invalidateQueries({queryKey: ['get-user-profile']});
        showMessage({
          message: 'Preferences updated successfully',
          type: 'success',
        });
      }
    },
  });

  const handleUpdateUserPreferences = () => {
    updateUserPreferences({
      userId: userData?.userId,
      data: {
        hideAccountBalance: hideAccount,
        allowPushNotification: pushNotifications,
        enableBioLogin: faceId,
      },
    });
  };

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
            setValue={() => {
              setPushNotifications(!pushNotifications);
              handleUpdateUserPreferences();
            }}
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
            setValue={() => {
              setFaceId(!faceId);
              handleUpdateUserPreferences();
            }}
          />
          <SettingItem
            title="Hide account balance"
            hasSwitch
            value={hideAccount}
            setValue={() => {
              setHideAccount(!hideAccount);
              handleUpdateUserPreferences();
            }}
          />
          <SettingItem
            title="Change password"
            onPress={() => navigate('ChangePassword')}
          />
        </Box>
      </Box>

      <Loader loading={isPending} />
    </Screen>
  );
};
