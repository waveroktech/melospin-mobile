import React from 'react';
import {Box, Text} from 'design-system';
import {Icon, Screen} from 'shared';
import theme from 'theme';
import {Image, ScrollView} from 'react-native';
import {DashboardHeader, ReleaseItem} from './components';
import {fontSz, hp, wp} from 'utils';
import {newReleases} from 'data';
import {styles} from './style';

export const Home = () => {
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <ScrollView>
        <DashboardHeader />

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
      </ScrollView>
    </Screen>
  );
};
