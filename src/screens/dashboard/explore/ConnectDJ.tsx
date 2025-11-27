import React, {useCallback, useEffect} from 'react';
import {Box, Text} from 'design-system';
import {Header, Icon, Loader, Screen} from 'shared';
import {ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import theme from 'theme';
import {deviceWidth, fontSz, formatNumber, hp, wp} from 'utils';
import {styles} from './style';
import {Image} from 'react-native';
import {EmptyPromotionContainer} from '../promotions/components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {useGetDjs, useMelospinStore, useSetSendConnection} from 'store';
import {showMessage} from 'react-native-flash-message';

export const ConnectDj = () => {
  const {dj} =
    useRoute<RouteProp<DashboardStackParamList, 'ConnectDJ'>>()?.params;
  const {goBack} = useNavigation();
  const {userType} = useMelospinStore();

  const {refetch} = useGetDjs();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const {mutate: sendConnection, isPending} = useSetSendConnection({
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.status === 'success') {
        showMessage({
          duration: 3000,
          message: 'Connection sent',
          type: 'success',
        });
        goBack();
      }
      if (data?.status === 'failed') {
        showMessage({
          duration: 3000,
          message: 'Connection already exits',
          type: 'danger',
        });
      }
    },
  });

  const handleConnect = useCallback(() => {
    sendConnection({targetUserId: dj?.userId});
  }, [dj?.userId, sendConnection]);

  console.log(dj);
  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Profile" />

      <ScrollView>
        <ImageBackground
          source={theme.images['cover-image']}
          resizeMode="cover"
          style={styles.imageBg}>
          <Box
            bg={theme.colors.OFF_BLACK_200}
            width={deviceWidth}
            height={hp(309)}>
            <Box justifyContent={'center'} py={hp(80)} alignItems={'center'}>
              <Image
                source={theme.images['dj-images']['dj-1']}
                style={styles.profileImage}
                resizeMode="contain"
              />
              <Box flexDirection={'row'} alignItems={'center'}>
                <Text variant="bodyMedium" color={theme.colors.WHITE} pr={1}>
                  {dj?.name}
                </Text>
                <Icon name="blue-tick" />
              </Box>
              <Text
                variant="body"
                fontSize={fontSz(12)}
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}
                pt={1}>
                DJ_{dj?.name?.split(' ')[0]}
              </Text>

              <Box
                bg={theme.colors.OFF_WHITE_400}
                mt={hp(10)}
                flexDirection={'row'}
                alignItems={'center'}
                style={{padding: hp(8)}}
                borderRadius={hp(24)}>
                <Image
                  source={theme.images['artist-list']}
                  style={styles.artistList}
                  resizeMode="contain"
                />
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}
                  px={10}>
                  {formatNumber(100)} Connects
                </Text>

                <Icon name="song-uploads" />
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}
                  pl={10}>
                  {formatNumber(10)}{' '}
                  {userType === 'artiste' ? 'Song Uploads' : 'Song Plays'}
                </Text>
              </Box>

              {userType === 'artiste' && (
                <Box
                  mt={hp(16)}
                  width={wp(260)}
                  justifyContent={'space-between'}
                  flexDirection={'row'}
                  alignItems={'center'}>
                  <Box
                    height={hp(40)}
                    px={wp(10)}
                    borderWidth={1}
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    onPress={handleConnect}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={hp(24)}
                    borderColor={theme.colors.WHITE}>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      Connect
                    </Text>
                  </Box>
                  <Box
                    height={hp(40)}
                    px={wp(10)}
                    borderWidth={1}
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={hp(24)}
                    borderColor={theme.colors.WHITE}>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      Send promo request
                    </Text>
                  </Box>
                </Box>
              )}
              {userType === 'dj' && (
                <Box
                  mt={hp(16)}
                  width={wp(200)}
                  justifyContent={'space-between'}
                  flexDirection={'row'}
                  alignItems={'center'}>
                  <Box
                    height={hp(40)}
                    px={wp(10)}
                    borderWidth={1}
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    onPress={handleConnect}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={hp(24)}
                    borderColor={theme.colors.WHITE}>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      Follow
                    </Text>
                  </Box>
                  <Box
                    height={hp(40)}
                    px={wp(10)}
                    borderWidth={1}
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={hp(24)}
                    borderColor={theme.colors.WHITE}>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      Share Profile
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </ImageBackground>

        {userType === 'artiste' ? null : (
          <Box
            mt={hp(20)}
            mx={wp(16)}
            borderBottomWidth={1}
            pb={20}
            borderBottomColor={theme.colors.BASE_SECONDARY}>
            <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              Socials
            </Text>
            <Box
              mt={10}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Box
                width={wp(110)}
                height={hp(40)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={24}
                bg={theme.colors.OFF_WHITE_500}>
                <Icon name="instagram" />
              </Box>
              <Box
                width={wp(110)}
                height={hp(40)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={24}
                bg={theme.colors.OFF_WHITE_500}>
                <Icon name="tiktok" />
              </Box>
              <Box
                width={wp(110)}
                height={hp(40)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={24}
                bg={theme.colors.OFF_WHITE_500}>
                <Icon name="snapchat" />
              </Box>
            </Box>
          </Box>
        )}

        <Box mt={hp(20)} mx={wp(16)}>
          <Text
            variant="bodyMedium"
            fontFamily={theme.font.AvenirNextSemiBold}
            color={theme.colors.WHITE}>
            Latest Releases
          </Text>

          <EmptyPromotionContainer
            icon="empty-folder"
            containerStyles={{my: hp(40)}}
            title="No Releases Uploaded"
            subTitle="You can view all audio files as soon as they are uploaded your library"
          />
        </Box>
      </ScrollView>

      <Loader loading={isPending} />
    </Screen>
  );
};
