/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import theme from 'theme';
import {TouchableOpacity, View} from 'react-native';
import {fontSz, hp, wp} from 'utils';
import {styles} from '../style';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabStackParamList, DashboardStackParamList} from 'types';
import {useGetDiscography, useMelospinStore} from 'store';
import {TrendingNow} from './TrendingNow';
import {DjsOnDeck} from './DjsOnDeck';

interface MyDeckProps {
  djs?: any[];
}

export const MyDeck: React.FC<MyDeckProps> = ({djs}) => {
  const {navigate} =
    useNavigation<
      NavigationProp<DashboardStackParamList & BottomTabStackParamList>
    >();
  const {userInfo} = useMelospinStore();
  const {data, refetch} = useGetDiscography();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
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
        style={[styles.gradientContainer, {pointerEvents: 'box-none'}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: hp(10),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigate('Discography')}
            activeOpacity={0.8}
            style={{
              width: wp(100),
              height: hp(102),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              variant="body"
              fontSize={fontSz(12)}
              pb={hp(10)}
              color={theme.colors.WHITE}>
              My Playlists
            </Text>
            <Icon name="playlist-icon" />
          </TouchableOpacity>
          <Box mx={wp(20)}>
            <Icon name="border-width" />
          </Box>
          <TouchableOpacity
            onPress={() => navigate('Promotions')}
            activeOpacity={0.8}
            style={{
              width: wp(100),
              height: hp(102),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              variant="body"
              fontSize={fontSz(12)}
              pb={hp(10)}
              color={theme.colors.WHITE}>
              My Promotions
            </Text>
            <Icon name="promotion-icon" />
          </TouchableOpacity>
        </View>
        <Box
          borderTopWidth={1}
          mx={wp(30)}
          py={hp(20)}
          flex={1}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          borderTopColor={theme.colors.BASE_SECONDARY}>
          <Box justifyContent={'center'} alignItems={'center'}>
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
              {userInfo?.totalPromotions ?? 0}
            </Text>
          </Box>
          <Box
            style={{width: 1}}
            height={hp(50)}
            backgroundColor={theme.colors.BASE_SECONDARY}
          />
          <Box justifyContent={'center'} alignItems={'center'}>
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
              {data?.data?.length ?? 0}
            </Text>
          </Box>
        </Box>
      </GradientBorderView>

      <Box mt={hp(30)}>
        <TrendingNow />
        <DjsOnDeck djs={djs} />
      </Box>
    </Box>
  );
};
