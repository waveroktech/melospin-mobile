import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {capitalizeTitle, fontSz, hp, wp} from 'utils';
import {styles} from './style';
import {Image, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import StarRating from 'shared/StarRating';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';

interface ConnectDjItemProps {
  item: {
    name: string;
    connected: boolean;
    connectionText: string | null;
    currentUserType: string;
    profileUrl: string;
    createdAt: string;
    userId: string;
    chargePerPlay: number;
    canPromote: boolean;
    ratings: number;
    accountStatus: string;
    address: {
      country: string;
      state: string;
    };
    promotionTypes: any[];
  };
}

export const ConnectDjItem = ({item}: ConnectDjItemProps) => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      borderWidth={1}
      as={TouchableOpacity}
      activeOpacity={0.8}
      onPress={() => navigate('ConnectDJ', {dj: item})}
      width={wp(163)}
      mr={wp(10)}
      mb={hp(16)}
      borderRadius={hp(24)}
      height={hp(178)}
      borderColor={theme.colors.BASE_SECONDARY}>
      <Box
        bg={theme.colors.OFF_BLACK_100}
        width={wp(163)}
        position={'absolute'}
        alignItems={'center'}
        justifyContent={'center'}
        bottom={0}
        borderRadius={hp(24)}
        height={hp(137)}>
        <Image
          source={theme.images['dj-images']['dj-1']}
          style={styles.profileImage}
        />

        <Box mb={hp(24)} flexDirection={'row'} mt={hp(2)} alignItems={'center'}>
          <Text
            pr={2}
            variant="bodyMedium"
            fontSize={fontSz(14)}
            numberOfLines={1}
            maxWidth={wp(100)}
            color={theme.colors.WHITE}>
            {item?.name ? capitalizeTitle(item.name) : ''}
          </Text>
          <Icon name="verified" />
        </Box>

        <Box
          borderTopWidth={1}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          borderColor={theme.colors.BASE_SECONDARY}>
          <Box
            pt={hp(2)}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text
              variant="bodyMedium"
              fontFamily={theme.font.AvenirNextRegular}
              fontSize={fontSz(12)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              Play rating
            </Text>
            <Text
              variant="bodyMedium"
              pl={wp(1)}
              fontSize={fontSz(12)}
              color={theme.colors.WHITE}>
              {item?.ratings}
            </Text>
          </Box>
          <StarRating rating={item?.ratings} />
        </Box>
        {/* <GradientBorderView
          gradientProps={{
            colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
          }}
          style={styles.buttonGradientContainer}>
          <Box as={TouchableOpacity} activeOpacity={0.8} flexDirection={'row'}>
            <Text variant="bodyMedium" color={theme.colors.WHITE}>
              Connect
            </Text>
          </Box>
        </GradientBorderView> */}
      </Box>
    </Box>
  );
};
