import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Screen} from 'shared';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {genres} from 'data';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const SetupProfile = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const form = watch();

  const selectGenre = async (selector: string) => {
    setSelectedGenres(prevState => {
      if (prevState.includes(selector)) {
        return prevState.filter(genre => genre !== selector);
      } else {
        return [...prevState, selector];
      }
    });
  };
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Back" />
      <HeaderText
        hasHeaderText="Set up profile"
        hasSubText="Fill profile type to customize your experience"
        width={wp(330)}
      />

      <AvoidingView>
        <ScrollView>
          <Box mt={hp(40)} mx={wp(16)}>
            <FormInput
              label="Enter brand name"
              autoCapitalize="none"
              control={control}
              name="email"
              value={form.email}
            />
            <FormInput
              label="Enter Instagram handle (ex @dj_zee)"
              autoCapitalize="none"
              control={control}
              name="email"
              value={form.email}
            />
            <FormInput
              label="Enter TikTok handle (ex @dj_zee)"
              autoCapitalize="none"
              control={control}
              name="email"
              value={form.email}
            />

            <Box
              bg={theme.colors.TEXT_INPUT_BG}
              pt={hp(12)}
              px={wp(16)}
              pb={hp(16)}
              borderRadius={hp(24)}>
              <Text variant="body" color={theme.colors.WHITE}>
                Select genre of music you specialize in
              </Text>
              <Box
                mt={hp(10)}
                flexDirection={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}>
                {genres?.map(genre => {
                  return (
                    <Box
                      key={genre?.id}
                      flexDirection={'row'}
                      alignItems={'center'}
                      mr={2}
                      py={2}
                      onPress={() => selectGenre(genre?.title)}
                      as={TouchableOpacity}
                      activeOpacity={0.8}
                      px={2}
                      borderRadius={hp(24)}
                      mb={10}
                      bg={theme.colors.BASE_SECONDARY}>
                      <Icon
                        name={
                          selectedGenres?.includes(genre?.title)
                            ? 'active-checkbox'
                            : 'checkbox'
                        }
                      />
                      <Text
                        pl={2}
                        variant="body"
                        fontSize={fontSz(14)}
                        color={theme.colors.WHITE}>
                        {genre?.title}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </AvoidingView>

      <Button title="Done" bg={theme.colors.PRIMARY_100} hasBorder />
    </Screen>
  );
};
