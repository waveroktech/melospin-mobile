import React, {useEffect, useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useMelospinStore, useUpdateBookingRate} from 'store';
import {showMessage} from 'react-native-flash-message';
import {queryClient} from 'services/api';

interface BookingRateProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  password: string;
  amount: string;
}

const schema = yup.object().shape({
  password: yup.string().required(),
  amount: yup.string().required(),
});

export const BookingRate = ({isVisible, onClose}: BookingRateProps) => {
  const [showPassword, setShowPassword] = useState(true);
  const {userData, userInfo} = useMelospinStore();

  const {mutate: updateBookingRate, isPending} = useUpdateBookingRate({
    onSuccess: (data: any) => {
      console.log(data, 'data');
      if (data?.status === 'success') {
        handleClose();
        queryClient.invalidateQueries({queryKey: ['get-user-profile']});
        showMessage({
          message: 'Booking rate updated successfully',
          type: 'success',
        });
      } else {
        showMessage({
          message: data?.message,
          type: 'danger',
        });
      }
    },
    onError: () => {
      showMessage({
        message: 'Failed to update booking rate',
        type: 'danger',
      });
    },
  });

  const {control, setValue, watch, reset} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      amount: userInfo?.chargePerPlay?.toString(),
    },
    mode: 'all',
  });

  useEffect(() => {
    setValue(
      'amount',
      formatNumberWithCommas(userInfo?.chargePerPlay?.toString()),
    );
  }, [userInfo?.chargePerPlay, setValue, isVisible]);

  const form = watch();

  const handleAmountChange = (value: string) => {
    setValue('amount', formatNumberWithCommas(value));
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    updateBookingRate({
      userId: userData?.userId,
      chargePerPlay: Number(form.amount.replace(/,/g, '')),
    });
  };

  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BASE_PRIMARY,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)}>
        <ModalHeader
          hasBackIcon
          iconName="back-icon"
          onClose={onClose}
          modalHeaderText="Set Booking Rate"
        />

        <Box mt={hp(20)} mx={wp(16)}>
          <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Confirm your booking fee rate for promotions
          </Text>

          <Box mt={hp(20)}>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              mt={hp(24)}
              mb={hp(20)}
              justifyContent={'space-between'}>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                height={hp(59)}
                borderRadius={hp(24)}
                width={wp(98)}
                px={wp(20)}
                justifyContent={'space-between'}
                bg={theme.colors.TEXT_INPUT_BG}>
                <Text variant="body" color={theme.colors.WHITE}>
                  NGN
                </Text>
                <Icon name="chevron-down" />
              </Box>

              <FormInput
                control={control}
                containerStyle={{width: wp(230), marginBottom: hp(0)}}
                name="amount"
                value={form.amount}
                onChangeText={(text: string) => handleAmountChange(text)}
                label="Enter budget amount"
              />
            </Box>

            <FormInput
              control={control}
              value={form.password}
              name="password"
              isPassword
              secureTextEntry={showPassword}
              label="Enter password here to confirm"
              onPressPasswordIcon={() => setShowPassword(!showPassword)}
            />
          </Box>
        </Box>
        <Button
          isNotBottom
          my={hp(20)}
          title="Save"
          hasBorder
          mx={wp(16)}
          isLoading={isPending}
          disabled={form.amount && form.password.length > 7 ? false : true}
          onPress={handleSave}
        />
      </Box>
    </BaseModal>
  );
};
