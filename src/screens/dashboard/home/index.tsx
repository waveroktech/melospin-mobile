import React from 'react';
import {Box, Text} from 'design-system';
import {Icon, Screen} from 'shared';
import theme from 'theme';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {DashboardHeader, ReleaseItem} from './components';
import {fontSz, hp, wp} from 'utils';
import {newReleases} from 'data';
import {styles} from './style';
import {useMelospinStore} from 'store';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabStackParamList, DashboardStackParamList} from 'types';

export const Home = () => {
  const {userType} = useMelospinStore();
  const {navigate} =
    useNavigation<
      NavigationProp<DashboardStackParamList & BottomTabStackParamList>
    >();
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <ScrollView>
        <DashboardHeader title="Home" />
        {userType === 'artiste' ? (
          <Box mt={hp(30)} mx={wp(16)}>
            <Text
              variant="bodyMedium"
              fontFamily={theme.font.AvenirNextSemiBold}
              color={theme.colors.WHITE}>
              New Releases
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}>
              {newReleases?.map((release, index) => {
                return <ReleaseItem release={release} key={index} />;
              })}
            </ScrollView>

            <Box mt={20}>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}>
                  Trending Now
                </Text>
                <Box ml={10} flexDirection={'row'} alignItems={'center'}>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(15)}
                    color={theme.colors.LIGHT_PRIMARY}
                    pr={2}>
                    Explore
                  </Text>
                  <Icon name="arrow-right-2" />
                </Box>
              </Box>

              <Image
                source={theme.images.trending}
                style={styles.trendingImage}
                resizeMode="contain"
              />

              <Box
                borderBottomWidth={2}
                py={hp(12)}
                borderBottomColor={theme.colors.BASE_SECONDARY}
              />

              <Box mt={hp(20)}>
                <Text>DJs on deck</Text>
              </Box>
            </Box>
          </Box>
        ) : userType === 'dj' ? (
          <Box mt={hp(30)} mx={wp(16)}>
            <Text
              variant="bodyMedium"
              fontSize={fontSz(16)}
              fontFamily={theme.font.AvenirNextSemiBold}
              color={theme.colors.WHITE}>
              My Deck
            </Text>

            <GradientBorderView
              gradientProps={{
                colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
              }}
              style={styles.gradientContainer}>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                pt={hp(10)}
                justifyContent={'center'}>
                <Box
                  width={wp(100)}
                  height={hp(102)}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Text
                    variant="body"
                    fontSize={fontSz(12)}
                    pb={hp(10)}
                    color={theme.colors.WHITE}>
                    My Playlists
                  </Text>
                  <Icon name="playlist-icon" />
                </Box>
                <Box mx={wp(20)}>
                  <Icon name="border-width" />
                </Box>
                <Box
                  width={wp(100)}
                  height={hp(102)}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Text
                    variant="body"
                    fontSize={fontSz(12)}
                    pb={hp(10)}
                    color={theme.colors.WHITE}>
                    My Promotions
                  </Text>
                  <Icon name="promotion-icon" />
                </Box>
              </Box>
              <Box
                borderTopWidth={1}
                mx={wp(30)}
                py={hp(20)}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                borderTopColor={theme.colors.BASE_SECONDARY}>
                <Box
                  borderRightWidth={1}
                  borderRightColor={theme.colors.BASE_SECONDARY}
                  pr={wp(10)}>
                  <Box flexDirection={'row'}>
                    <Icon name="star-rating" />
                    <Text
                      pl={wp(1)}
                      variant="body"
                      color={theme.colors.WHITE}
                      fontSize={fontSz(12)}>
                      Play Ratings
                    </Text>
                  </Box>
                  <Text
                    variant="body"
                    fontSize={fontSz(14)}
                    pt={hp(2)}
                    color={theme.colors.WHITE}>
                    4.8
                  </Text>
                </Box>
                <Box
                  borderRightWidth={1}
                  borderRightColor={theme.colors.BASE_SECONDARY}
                  px={wp(10)}>
                  <Box flexDirection={'row'}>
                    <Icon name="requests" />
                    <Text
                      pl={wp(1)}
                      variant="body"
                      color={theme.colors.WHITE}
                      fontSize={fontSz(12)}>
                      Requests
                    </Text>
                  </Box>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(14)}
                    pt={hp(2)}
                    color={theme.colors.WHITE}>
                    1.1k
                  </Text>
                </Box>
                <Box pl={wp(10)}>
                  <Box flexDirection={'row'}>
                    <Icon name="requests" />
                    <Text
                      pl={wp(1)}
                      variant="body"
                      color={theme.colors.WHITE}
                      fontSize={fontSz(12)}>
                      Playlists
                    </Text>
                  </Box>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(14)}
                    pt={hp(2)}
                    color={theme.colors.WHITE}>
                    1.1k
                  </Text>
                </Box>
              </Box>
            </GradientBorderView>

            <Box mt={20}>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}>
                  Trending Now
                </Text>
                <Box
                  ml={10}
                  as={TouchableOpacity}
                  onPress={() => navigate('Explore')}
                  flexDirection={'row'}
                  alignItems={'center'}>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(15)}
                    color={theme.colors.LIGHT_PRIMARY}
                    pr={2}>
                    Explore
                  </Text>
                  <Icon name="arrow-right-2" />
                </Box>
              </Box>

              <Image
                source={theme.images.trending}
                style={styles.trendingImage}
                resizeMode="contain"
              />

              <Box
                borderBottomWidth={2}
                py={hp(12)}
                borderBottomColor={theme.colors.BASE_SECONDARY}
              />

              <Box mt={hp(20)}>
                <Text>DJs on deck</Text>
              </Box>
            </Box>
          </Box>
        ) : null}
      </ScrollView>
    </Screen>
  );
};
