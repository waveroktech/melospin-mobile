import React, {useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {AvoidingView, BaseModal, Loader, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import {ScrollView} from 'react-native';
import {FormInput} from 'design-system';
import theme from 'theme';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {IdTypeList} from './IdTypeList';
import {FileUpload} from 'screens/dashboard/promotions/components';
import {
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {useSubmitKyc} from 'store/useUser';
import {useMelospinStore} from 'store';
import {useQueryClient} from '@tanstack/react-query';

interface ManageKycProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  phoneNumber: string;
  personalAddress: string;
  idType: string;
  idNumber: string;
  idFile: any;
}

const schema = yup.object().shape({
  phoneNumber: yup.string().required(),
  personalAddress: yup.string().required(),
  idType: yup.string().required(),
  idNumber: yup.string().required(),
  idFile: yup.object().required(),
});

export const ManageKyc = ({isVisible, onClose}: ManageKycProps) => {
  const [open, setOpen] = useState<'id-type' | ''>('');
  const {userInfo} = useMelospinStore();
  const queryClient = useQueryClient();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '',
      personalAddress: '',
      idType: '',
      idNumber: '',
      idFile: '',
    },
    mode: 'all',
  });

  const form = watch();

  // Submit KYC mutation
  const {mutate: submitKyc, isPending} = useSubmitKyc({
    onSuccess: (data: any) => {
      if (data?.status === 'success' || data?.data) {
        showMessage({
          message: 'KYC submitted successfully',
          type: 'success',
          duration: 2000,
        });
        // Invalidate user profile query to get updated KYC status
        queryClient.invalidateQueries({queryKey: ['get-user-profile']});
        // Reset form and close modal
        reset();
        onClose();
      } else {
        showMessage({
          message: data?.message || 'Failed to submit KYC',
          type: 'danger',
          duration: 2000,
        });
      }
    },
    onError: (error: any) => {
      showMessage({
        message: error?.message || 'Failed to submit KYC',
        type: 'danger',
        duration: 2000,
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    if (!userInfo?.userId) {
      showMessage({
        message: 'User ID not found',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    if (!data.idFile?.uri) {
      showMessage({
        message: 'Please upload an ID document',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    submitKyc({
      userId: userInfo.userId,
      file: {
        uri: data.idFile.uri,
        type: data.idFile.type || 'image/png',
        name: data.idFile.name || 'kyc-document.png',
      },
      identificationType: data.idType.toLowerCase(),
      identificationNumber: data.idNumber,
      homeAddress: data.personalAddress,
      phoneNumber: data.phoneNumber,
    });
  };

  const openMediaPicker = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo' as MediaType,
          quality: 1,
          selectionLimit: 1,
        },
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            return;
          }

          if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            // Format the response to match the expected file structure
            const file = {
              uri: asset.uri,
              type: asset.type,
              name:
                asset.fileName || asset.uri?.split('/').pop() || 'image.jpg',
              size: asset.fileSize,
              title: asset.fileName || 'Selected Image',
            };
            setValue('idFile', file);
          }
        },
      );
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error selecting image',
        type: 'danger',
      });
    }
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          modalHeaderText="Update KYC"
        />

        <AvoidingView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(150)}}>
            <Box mt={hp(40)} mx={16}>
              <FormInput
                label="Phone number"
                control={control}
                name="phoneNumber"
                value={form.phoneNumber}
                maxLength={11}
                keyboardType="numeric"
                errorText={errors.phoneNumber?.message}
              />

              <FormInput
                label="Personal address"
                control={control}
                name="personalAddress"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                containerStyle={{
                  height: hp(100),
                }}
                inputTextStyle={{
                  height: hp(100),
                }}
                value={form.personalAddress}
                errorText={errors.personalAddress?.message}
              />

              <Box mt={hp(24)}>
                <Text variant="body" color={theme.colors.WHITE} pb={hp(12)}>
                  Means of identification
                </Text>

                <FormInput
                  label="ID type"
                  autoCapitalize="none"
                  control={control}
                  name="idType"
                  value={form.idType}
                  isDropDown
                  onPressDropDown={() => setOpen('id-type')}
                  errorText={errors.idType?.message}
                />
                <FormInput
                  label="ID number"
                  autoCapitalize="none"
                  control={control}
                  name="idNumber"
                  keyboardType="numeric"
                  maxLength={11}
                  value={form.idNumber}
                  errorText={errors.idNumber?.message}
                />
                <FileUpload
                  type="image"
                  selectedFile={form.idFile}
                  clearSelectedFile={() => setValue('idFile', '')}
                  onPress={openMediaPicker}
                  text="Click here to upload file or ID snapshot"
                  extraStyles={{
                    marginTop: hp(0),
                    marginHorizontal: wp(0),
                  }}
                />
              </Box>
            </Box>
          </ScrollView>
        </AvoidingView>
      </Box>

      <Button
        title="Submit"
        hasBorder
        onPress={handleSubmit(onSubmit)}
        iconName="arrow-right-3"
        disabled={
          isPending ||
          !(
            form.phoneNumber &&
            form.personalAddress &&
            form.idType &&
            form.idNumber &&
            form.idFile
          )
        }
      />

      <Loader loading={isPending} />

      <IdTypeList
        isVisible={open === 'id-type'}
        onClose={() => setOpen('')}
        onComplete={value => {
          setOpen('');
          setValue('idType', value.title);
        }}
      />
    </BaseModal>
  );
};
