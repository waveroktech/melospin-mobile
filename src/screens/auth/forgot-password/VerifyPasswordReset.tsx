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
import {useInitPasswordReset, useVerifyPasswordReset} from 'store';

const CELL_COUNT = 6;

export const VerifyPasswordReset = () => {
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();

  const {email} =
    useRoute<RouteProp<AuthStackParamList, 'VerifyPasswordReset'>>()?.params;

  const [otp, setOtp] = useState('');
  const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

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

  const {mutate: initPasswordReset, isPending} = useInitPasswordReset({
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.status === 'failed') {
        return showMessage({
          message: data?.message,
          type: 'danger',
          duration: 2000,
        });
      }
      if (data?.status === 'success') {
        setMinutes(2);
        setSeconds(0);
        return showMessage({
          message: data?.message,
          type: 'success',
          duration: 2000,
        });
      }
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handlePasswordReset = useCallback(() => {
    initPasswordReset({email});
  }, [email, initPasswordReset]);

  const {mutate: verifyPasswordReset, isPending: passwordVerifyLoading} =
    useVerifyPasswordReset({
      onSuccess: (data: any) => {
        console.log(data);
        if (data?.status === 'failed') {
          return showMessage({
            message: data?.message,
            type: 'danger',
            duration: 2000,
          });
        }
        if (data?.status === 'success') {
          navigate('ResetPassword', {data: data?.data});
          return showMessage({
            message: data?.message,
            type: 'success',
            duration: 2000,
          });
        }
      },
      onError: (error: any) => {
        console.error(error);
      },
    });

  const handleVerifyPasswordReset = useCallback(() => {
    verifyPasswordReset({otpEmail: email, otp});
  }, [email, otp, verifyPasswordReset]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText={'Back to login'} />

      <HeaderText
        hasHeaderText="Reset Password"
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
              onPress={handlePasswordReset}>
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
        title="Continue"
        bg={theme.colors.PRIMARY_100}
        hasBorder
        onPress={handleVerifyPasswordReset}
        disabled={otp?.length === 6 ? false : true}
        // onPress={() => navigate('ResetPassword')}
      />

      <Loader loading={isPending || passwordVerifyLoading} />
    </Screen>
  );
};
