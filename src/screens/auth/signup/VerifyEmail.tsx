import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {Header, HeaderText, Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {hp, wp} from 'utils';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TouchableOpacity} from 'react-native';
import {styles} from './style';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {showMessage} from 'react-native-flash-message';
import {useMelospinStore, useSetVerifyAccount} from 'store';

const CELL_COUNT = 6;

export const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const {setAuthToken, setUserData} = useMelospinStore();
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const {email} =
    useRoute<RouteProp<AuthStackParamList, 'VerifyEmail'>>()?.params;

  const [minutes, setMinutes] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const resend = async () => {
    setMinutes(2);
    setSeconds(0);
  };

  const {mutate: verifyAccount, isPending} = useSetVerifyAccount({
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.status === 'failed') {
        return showMessage({
          message: data?.message,
          type: 'danger',
          duration: 2000,
        });
      } else if (data?.status === 'pending') {
        return showMessage({
          message: data?.message,
          type: 'info',
          duration: 2000,
        });
      }
      setAuthToken(data?.data?.token);
      setUserData(data?.data);
      showMessage({
        message: data.message,
        type: 'success',
        duration: 2000,
      });
      navigate('SelectProfile');
    },
  });

  const handleVerifyAccount = useCallback(() => {
    verifyAccount({
      otpEmail: email,
      otp: otp,
    });
  }, [email, otp, verifyAccount]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText={'Back'} />

      <HeaderText
        hasHeaderText="Verify email"
        hasSubText="Enter code sent to your email address"
        width={wp(300)}
      />

      <Box mt={hp(30)} mx={wp(16)}>
        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={setOtp}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Fragment key={index}>
              <Box style={[styles.cellRoot, isFocused && styles.focusInput]}>
                <Text
                  style={styles.cellText}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </Box>
            </Fragment>
          )}
        />

        <Box style={styles.otpInfoContainer}>
          {minutes === 0 && seconds === 0 ? (
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => resend()}>
              <Icon name="arrow-right" />
            </Box>
          ) : (
            <>
              <Text style={[styles.timeText, {color: theme.colors.WHITE}]}>
                Resend after {minutes}:{seconds < 10 ? `0${seconds}` : seconds}s
              </Text>
            </>
          )}
        </Box>
      </Box>

      <Button
        title="Confirm email"
        disabled={otp.length === 6 ? false : true}
        bg={theme.colors.PRIMARY_100}
        onPress={handleVerifyAccount}
        hasBorder
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
