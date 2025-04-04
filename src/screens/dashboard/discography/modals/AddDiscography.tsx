import React, {useCallback} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import Modal from 'react-native-modal';
import {hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';
import {TouchableOpacity} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
interface AddDiscographyProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface FormData {
  link: string;
  title: string;
  artist: string;
  collabo?: string;
}

const schema = yup.object().shape({
  link: yup
    .string()
    .url('Please enter a valid URL')
    .matches(/^https:\/\//, 'URL must start with https://')
    .required('URL is required'),
  title: yup.string().required(),
  artist: yup.string().required(),
  collabo: yup.string().optional(),
});

export const AddDiscography = ({
  isVisible,
  onClose,
  onComplete,
}: AddDiscographyProps) => {
  const {
    control,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      link: '',
      title: '',
      artist: '',
      collabo: '',
    },
    mode: 'all',
  });

  const form = watch();

  const handleUpload = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <Box>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}>
        <Box
          bg={theme.colors.BLACK}
          borderWidth={0.5}
          width={wp(353)}
          p={hp(20)}
          bottom={hp(40)}
          alignSelf={'center'}
          borderRadius={hp(24)}
          height={hp(450)}
          borderColor={theme.colors.TEXT_INPUT_PLACEHOLDER}>
          <Box
            bg={theme.colors.OFF_BLACK_100}
            justifyContent={'center'}
            borderRadius={hp(24)}
            alignItems={'center'}>
            <FormInput
              control={control}
              name="link"
              containerStyle={{width: wp(290), marginTop: hp(10)}}
              label="File download link"
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
              value={form.link}
              errorText={errors?.link?.message}
            />
            <FormInput
              control={control}
              name="title"
              containerStyle={{width: wp(290)}}
              label="Audio file title"
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
              value={form.link}
            />
            <FormInput
              control={control}
              name="link"
              containerStyle={{width: wp(290)}}
              label="Primary artiste"
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
              value={form.link}
            />

            <FormInput
              control={control}
              name="link"
              containerStyle={{width: wp(290)}}
              label="Other collaborators"
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
              value={form.link}
            />
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            width={wp(112)}
            height={hp(40)}
            mt={hp(20)}
            borderWidth={1}
            justifyContent={'center'}
            borderRadius={hp(24)}
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={handleUpload}
            alignSelf={'center'}
            borderColor={theme.colors.WHITE}>
            <Text variant="body" color={theme.colors.WHITE}>
              Upload
            </Text>
            <Icon name="upload-icon" />
          </Box>
        </Box>

        <Button
          isNotBottom
          position={'absolute'}
          top={hp(5)}
          hasBorder
          onPress={onClose}
          width={wp(160)}
          right={wp(0)}
          iconName="close-icon-2"
          title="Cancel Upload"
        />
      </Modal>
    </Box>
  );
};
