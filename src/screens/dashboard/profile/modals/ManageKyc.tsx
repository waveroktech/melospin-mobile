import React, {useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {AvoidingView, BaseModal, ModalHeader} from 'shared';
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

  const {
    control,
    watch,
    setValue,
    formState: {errors},
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
        onPress={() => {}}
        iconName="arrow-right-3"
        disabled={
          form.phoneNumber &&
          form.personalAddress &&
          form.idType &&
          form.idNumber &&
          form.idFile
            ? false
            : true
        }
      />

      <IdTypeList
        isVisible={open === 'id-type'}
        onClose={() => setOpen('')}
        onComplete={value => {
          setOpen('');
          setValue('idType', value);
        }}
      />
    </BaseModal>
  );
};
