import React, {useEffect} from 'react';
import {Box, Text} from 'design-system';
import {Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {DashboardHeader, ReleaseItem} from './components';
import {fontSz, hp, wp} from 'utils';
import {newReleases} from 'data';
import {styles} from './style';
import {
  useGetBankList,
  useGetDjs,
  useGetUserProfile,
  useMelospinStore,
} from 'store';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabStackParamList, DashboardStackParamList} from 'types';

export const Home = () => {
  const {userType} = useMelospinStore();
  const {navigate} =
    useNavigation<
      NavigationProp<DashboardStackParamList & BottomTabStackParamList>
    >();
  const {data, isPending, refetch} = useGetDjs();
  const {userData, userInfo} = useMelospinStore();
  useGetBankList();

  useGetUserProfile({
    userId: userData?.userId,
  });

  useEffect(() => {
    if (userType === 'artiste') {
      refetch();
    }
  }, [refetch, userType]);

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
                <Text
                  variant="bodyMedium"
                  fontSize={fontSz(16)}
                  color={theme.colors.WHITE}>
                  DJs on deck
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {data?.data?.length &&
                    data?.data?.slice(0, 4)?.map((dj: any, index: number) => {
                      return (
                        <Box
                          key={index}
                          mt={hp(10)}
                          width={wp(86)}
                          mr={wp(10)}
                          justifyContent={'center'}
                          alignItems={'center'}
                          height={hp(84)}>
                          <Image
                            source={theme.images['dj-images']['dj-1']}
                            style={styles.djProfile}
                          />
                          <Text
                            variant="bodyMedium"
                            pt={1}
                            fontFamily={theme.font.AvenirNextSemiBold}
                            fontSize={fontSz(12)}
                            numberOfLines={1}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{textTransform: 'capitalize'}}
                            color={theme.colors.WHITE}>
                            {dj?.name}
                          </Text>
                        </Box>
                      );
                    })}
                </ScrollView>
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
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => navigate('Discography')}
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
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => navigate('Promotions')}
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
                    {userInfo?.ratings}
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
                    {userInfo?.requests ?? 0}
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
                    {userInfo?.playsCount ?? 0}
                  </Text>
                </Box>
              </Box>
            </GradientBorderView>

            <Box mt={hp(30)}>
              <Box flexDirection={'row'} alignItems={'center'} mb={hp(12)}>
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
                resizeMode="cover"
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

      {userType === 'artiste' && <Loader loading={isPending} />}
    </Screen>
  );
};
