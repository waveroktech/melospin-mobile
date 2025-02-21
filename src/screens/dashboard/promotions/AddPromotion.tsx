import React from 'react';
import {Box, Button, FormInput} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {FileUpload} from './components';
import theme from 'theme';
import {ScrollView} from 'react-native';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {styles} from './style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';

interface FormData {
  spotify?: string;
  apple?: string;
  youtube?: string;
}

const schema = yup.object().shape({
  spotify: yup.string().optional(),
  apple: yup.string().optional(),
  youtube: yup.string().optional(),
});

export const AddPromotion = () => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      spotify: '',
      apple: '',
      youtube: '',
    },
    mode: 'all',
  });

  const form = watch();

  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Set up Promotion" />

      <AvoidingView>
        <ScrollView>
          <HeaderText
            hasHeaderText="Fill Audio details for promotion"
            hasHeaderTextStyle={{fontSize: fontSz(14)}}
            hasIndicatorLevel
          />

          <FileUpload />

          <Box
            borderBottomWidth={0.6}
            mx={wp(16)}
            py={hp(16)}
            borderBottomColor={theme.colors.BASE_SECONDARY}
          />

          <Box mx={wp(16)} mt={hp(24)}>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              mb={hp(24)}
              justifyContent={'space-between'}>
              <Box style={styles.optionContainer}>
                <Icon name="spotify" />
              </Box>
              <FormInput
                containerStyle={styles.inputContainerStyle}
                control={control}
                name="spotify"
                label="Enter Spotify link"
                value={form.spotify}
              />
            </Box>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              mb={hp(24)}
              justifyContent={'space-between'}>
              <Box style={styles.optionContainer}>
                <Icon name="apple-music" />
              </Box>
              <FormInput
                containerStyle={styles.inputContainerStyle}
                control={control}
                name="spotify"
                label="Enter Apple Music link"
                value={form.apple}
              />
            </Box>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              mb={hp(24)}
              justifyContent={'space-between'}>
              <Box style={styles.optionContainer}>
                <Icon name="youtube-music" />
              </Box>
              <FormInput
                containerStyle={styles.inputContainerStyle}
                control={control}
                name="spotify"
                label="Enter Apple Music link"
                value={form.apple}
              />
            </Box>
          </Box>
        </ScrollView>
      </AvoidingView>

      <Button
        title="Continue"
        bg={theme.colors.PRIMARY_100}
        hasBorder
        onPress={() => navigate('AddDjs')}
        iconName="arrow-right-white"
      />
    </Screen>
  );
};
