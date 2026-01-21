import React from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, BaseModal, Icon, ModalHeader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import theme from 'theme';
import {useMelospinStore, useAddPlayingSpot} from 'store';
import {showMessage} from 'react-native-flash-message';
import {useQueryClient} from '@tanstack/react-query';

interface AddNewPlaySpotProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  location: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  location: yup.string().required(),
});

export const AddNewPlaySpot = ({isVisible, onClose}: AddNewPlaySpotProps) => {
  const {userData} = useMelospinStore();
  const queryClient = useQueryClient();

  const {control, watch, handleSubmit, reset} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      location: '',
    },
    mode: 'all',
  });

  const form = watch();

  // Add playing spot mutation
  const {mutate: addPlayingSpot, isPending} = useAddPlayingSpot({
    onSuccess: (data: any) => {
      if (data?.status === 'success' || data?.data) {
        showMessage({
          message: 'Play spot added successfully',
          type: 'success',
          duration: 2000,
        });
        // Invalidate user profile query to refetch updated data
        queryClient.invalidateQueries({queryKey: ['get-user-profile']});
        reset();
        onClose();
      } else {
        showMessage({
          message: data?.message || 'Failed to add play spot',
          type: 'danger',
          duration: 2000,
        });
      }
    },
    onError: (error: any) => {
      showMessage({
        message: error?.message || 'Failed to add play spot',
        type: 'danger',
        duration: 2000,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!userData?.userId) {
      showMessage({
        message: 'User ID not found',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    addPlayingSpot({
      userId: userData.userId,
      playSpot: data.title,
      playSpotAddress: data.location,
    });
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          modalHeaderText="Add New Play Spot"
        />

        <AvoidingView>
          <ScrollView>
            <Box mt={hp(40)} mx={16}>
              <FormInput
                label="Enter your play spot (e.g., Wbar Lounge)."
                control={control}
                name="title"
                value={form.title}
              />

              <FormInput
                label="Enter play spot address"
                control={control}
                name="location"
                value={form.location}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                containerStyle={{
                  height: hp(100),
                  marginTop: hp(10),
                }}
                inputTextStyle={{
                  height: hp(100),
                }}
              />

              <Box flexDirection={'row'} alignItems={'center'} bottom={hp(12)}>
                <Icon name="info-icon" />
                <Text
                  variant="body"
                  fontSize={fontSz(12)}
                  pl={wp(12)}
                  color={theme.colors.OFF_WHITE_100}>
                  Address must be verifiable for promotion approval. You can add
                  more spots later or leave blank if none.
                </Text>
              </Box>
            </Box>
          </ScrollView>
        </AvoidingView>
      </Box>

      <Button
        title="Save"
        hasBorder
        onPress={handleSubmit(onSubmit)}
        iconName="arrow-right-3"
        disabled={!form.title || !form.location || isPending}
      />
    </BaseModal>
  );
};
