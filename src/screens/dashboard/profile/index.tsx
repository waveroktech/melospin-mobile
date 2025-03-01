import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon, Screen} from 'shared';
import theme from 'theme';
import {styles} from './style';
import {Box, Text} from 'design-system';
import {deviceWidth, fontSz, formatNumber, hp, wp} from 'utils';
import {EmptyPromotionContainer} from '../promotions/components';
import {EditProfile} from './modals';
import {useMelospinStore} from 'store';

export const Profile = () => {
  const [open, setOpen] = useState<'edit-profile' | ''>('');
  const {userData} = useMelospinStore();
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
                  {userData?.firstName} {userData?.lastName}
                </Text>
                <Icon name="blue-tick" />
              </Box>
              <Text
                variant="body"
                fontSize={fontSz(12)}
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}
                pt={1}>
                @{userData?.brandName}
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
                  {formatNumber(userData?.totalConnections)} Connects
                </Text>

                <Icon name="song-uploads" />
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}
                  pl={10}>
                  {formatNumber(userData?.recentUploads?.length)} Song Uploads
                </Text>
              </Box>

              <Box
                mt={hp(16)}
                width={wp(250)}
                justifyContent={'space-around'}
                flexDirection={'row'}
                alignItems={'center'}>
                <Box
                  width={wp(105)}
                  height={hp(40)}
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
                <Box
                  width={wp(105)}
                  height={hp(40)}
                  borderWidth={1}
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => setOpen('edit-profile')}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={hp(24)}
                  borderColor={theme.colors.WHITE}>
                  <Text variant="bodyMedium" color={theme.colors.WHITE}>
                    Edit Profile
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </ImageBackground>

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

      <EditProfile
        isVisible={open === 'edit-profile'}
        onClose={() => setOpen('')}
      />
    </Screen>
  );
};
