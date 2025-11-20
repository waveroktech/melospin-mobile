import React from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, BaseModal, Icon, ModalHeader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import theme from 'theme';
import {useMelospinStore} from 'store';

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

  console.log(userData, 'userData');

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      location: '',
    },
    mode: 'all',
  });

  const form = watch();

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
        onPress={() => {}}
        iconName="arrow-right-3"
        disabled={form.title && form.location ? false : true}
      />
    </BaseModal>
  );
};
