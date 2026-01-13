import React from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../style';
import {Icon} from 'shared';
import {BottomTabStackParamList, DashboardStackParamList} from 'types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {EmptyPromotionContainer} from '../../promotions/components';

interface DjsOnDeckProps {
  djs?: any[];
}

export const DjsOnDeck = ({djs = []}: DjsOnDeckProps) => {
  const {navigate} =
    useNavigation<
      NavigationProp<BottomTabStackParamList & DashboardStackParamList>
    >();
  return (
    <Box mt={hp(20)}>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text
          variant="bodyMedium"
          fontSize={fontSz(16)}
          color={theme.colors.WHITE}>
          DJs on deck
        </Text>

        <Box
          ml={10}
          flexDirection={'row'}
          alignItems={'center'}
          as={TouchableOpacity}
          onPress={() => navigate('Explore')}
          activeOpacity={0.8}>
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

      {!djs || djs.length === 0 ? (
        <EmptyPromotionContainer
          icon="empty-folder"
          containerStyles={{my: hp(30), mb: hp(10)}}
          title="No DJs Available"
          subTitle="Explore to discover DJs on the platform"
        />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {djs.slice(0, 4).map((dj: any, index: number) => {
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
                  {dj?.name || ''}
                </Text>
              </Box>
            );
          })}
        </ScrollView>
      )}
    </Box>
  );
};
