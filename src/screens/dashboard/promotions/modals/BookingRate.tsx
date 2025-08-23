import React, {useEffect, useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useMelospinStore} from 'store';

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
  const {bookingRate, setBookingRate} = useMelospinStore();

  const {control, setValue, watch, reset} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      amount: '',
    },
    mode: 'all',
  });

  useEffect(() => {
    setValue('amount', formatNumberWithCommas(bookingRate?.toString()));
  }, [bookingRate, setValue, isVisible]);

  const form = watch();

  const handleAmountChange = (value: string) => {
    setValue('amount', formatNumberWithCommas(value));
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    setBookingRate(Number(form.amount.replace(/,/g, '')));
    handleClose();
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
          disabled={form.amount && form.password.length > 7 ? false : true}
          onPress={handleSave}
        />
      </Box>
    </BaseModal>
  );
};
