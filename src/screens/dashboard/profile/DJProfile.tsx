import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Header, Icon, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import theme from 'theme';
import {styles} from './style';
import {EditProfile, ShareProfile} from './modals';

export const DJProfile = () => {
  const [open, setOpen] = useState<'share-profile' | 'edit-profile' | ''>('');
  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(50)}}>
        <Box mt={hp(20)} mx={wp(16)}>
          <Box>
            <GradientBorderView
              gradientProps={{
                colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
              }}
              style={styles.gradientContainer}>
              <ImageBackground
                source={theme.images.artist}
                imageStyle={styles.imageStyle}
                style={styles.imageContainer}>
                <Box
                  bg={theme.colors.OFF_BLACK_200}
                  width={wp(343)}
                  p={hp(20)}
                  borderRadius={hp(24)}
                  height={hp(145)}>
                  <Box
                    flexDirection={'row'}
                    as={TouchableOpacity}
                    alignSelf={'flex-end'}
                    activeOpacity={0.8}
                    alignItems={'center'}>
                    <Text
                      pr={wp(10)}
                      variant="body"
                      color={theme.colors.LIGHT_PRIMARY}>
                      Change Cover
                    </Text>
                    <Icon name="arrow-right-2" />
                  </Box>
                </Box>
              </ImageBackground>
            </GradientBorderView>
            <Box width={wp(100)}>
              <GradientBorderView
                gradientProps={{
                  colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
                }}
                style={styles.profileImageContainer}>
                <Box>
                  <Image
                    source={theme.images['dj-images']['dj-1']}
                    style={styles.djProfileImage2}
                    resizeMode="contain"
                  />
                </Box>
              </GradientBorderView>
              <Box
                width={wp(100)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                position={'absolute'}
                bottom={-hp(30)}
                right={wp(-80)}
                zIndex={1000}>
                <Icon name="edit-icon" />
              </Box>
            </Box>
          </Box>

          <Box mt={hp(50)}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text
                variant="bodyMedium"
                fontFamily={theme.font.AvenirNextSemiBold}
                fontSize={fontSz(16)}
                pr={2}
                color={theme.colors.WHITE}>
                DJ Zenzee
              </Text>
              <Box top={0.5}>
                <Icon name="verified-icon" />
              </Box>
            </Box>
            <Text
              variant="body"
              fontSize={fontSz(14)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}
              pt={hp(2)}>
              I’m a Multi- talented DJ with a vibe beyond the borders
            </Text>

            <Box mt={hp(20)} flexDirection={'row'} alignItems={'center'}>
              <Box
                width={wp(134)}
                height={hp(40)}
                borderWidth={1}
                flexDirection={'row'}
                alignItems={'center'}
                borderRadius={hp(24)}
                px={wp(2)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => setOpen('edit-profile')}
                justifyContent={'space-evenly'}
                borderColor={theme.colors.WHITE}>
                <Icon name="edit-profile" />
                <Text variant="body" color={theme.colors.WHITE}>
                  Edit Profile
                </Text>
              </Box>

              <Box
                width={wp(134)}
                height={hp(40)}
                borderWidth={1}
                ml={wp(20)}
                flexDirection={'row'}
                alignItems={'center'}
                borderRadius={hp(24)}
                px={wp(2)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => setOpen('share-profile')}
                justifyContent={'space-evenly'}
                borderColor={theme.colors.WHITE}>
                <Icon name="share-profile" />
                <Text variant="body" color={theme.colors.WHITE}>
                  Share Profile
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            borderTopWidth={1}
            mt={hp(25)}
            borderTopColor={theme.colors.BASE_SECONDARY}>
            <Text
              variant="body"
              pt={hp(20)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
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

            <Box mt={hp(26)}>
              <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Milestones
              </Text>

              <Box
                bg={theme.colors.OFF_WHITE_400}
                p={hp(20)}
                mt={hp(10)}
                borderRadius={hp(24)}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="connects" />
                  <Text
                    pl={wp(10)}
                    variant="bodyMedium"
                    color={theme.colors.WHITE}>
                    1.1k Connects
                  </Text>
                </Box>

                <Box flexDirection={'row'} mt={hp(16)} alignItems={'center'}>
                  <Icon name="song-plays" />
                  <Text
                    pl={wp(10)}
                    variant="bodyMedium"
                    color={theme.colors.WHITE}>
                    1.1k Song Plays
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box mt={hp(26)}>
              <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Genres
              </Text>

              <Box
                bg={theme.colors.OFF_WHITE_400}
                p={hp(20)}
                mt={hp(10)}
                borderRadius={hp(24)}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="genres" />
                  <Text
                    pl={wp(10)}
                    variant="bodyMedium"
                    color={theme.colors.WHITE}>
                    RnB, Afro-House, Amapiano, Hip-hop, Pop
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>

      <ShareProfile
        isVisible={open === 'share-profile'}
        onClose={() => setOpen('')}
      />
      <EditProfile
        isVisible={open === 'edit-profile'}
        onClose={() => setOpen('')}
      />
    </Screen>
  );
};
