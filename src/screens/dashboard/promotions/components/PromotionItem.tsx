import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {styles} from './style';
import {Image, TouchableOpacity} from 'react-native';
import {fontSz, hp, wp} from 'utils';
import {Icon} from 'shared';

interface PromotionOwner {
  firstName: string;
  lastName: string;
  currentUserType: string;
  promoterId: string;
}

interface PromotionDetails {
  paid: boolean;
  status: 'pending' | 'active' | 'completed' | 'Pending approval';
  promotionLink: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  minPlayCount: number;
  locations: string[];
  owner: PromotionOwner;
  bidAmount: number;
  amount: number;
  promotersCount: number;
  promotionId: string;
  promotionTypes: any[];
}

interface StatusReport {
  reportId: string;
  status: 'pending' | 'accepted' | 'declined';
  firstName: string;
  lastName: string;
  brandName: string;
  email: string;
  bidAmount: number;
}

interface Promotion {
  _id: string;
  statusReport?: StatusReport[];
  details: PromotionDetails;
  title?: string;
  djCount?: number;
  playlistName?: string;
  timeline?: string;
}

// New structure for promo requests
interface PromoRequest {
  playInfo?: {
    requestStatus?: string;
    promoStatus?: string;
  };
  promotion?: {
    _id?: string;
    status?: string;
    promotionLink?: string;
    promotersCount?: number;
    startDate?: string;
    endDate?: string;
  };
  promoter?: any;
  owner?: any;
  proofs?: any[];
}

interface PromotionItemProps {
  promotion: Promotion | PromoRequest;
  onPress?: () => void;
}

export const PromotionItem = ({promotion, onPress}: PromotionItemProps) => {
  // Check if it's the new structure (PromoRequest) or old structure (Promotion)
  const isNewStructure = 'playInfo' in promotion || 'promotion' in promotion;


  const promotionStatus = isNewStructure
    ? (promotion as PromoRequest)?.playInfo?.requestStatus === 'pending' ||
      (promotion as PromoRequest)?.playInfo?.promoStatus === 'pending'
      ? 'Pending approval'
      : 'Active'
    : (promotion as Promotion)?.details?.status === 'pending' ||
      (promotion as Promotion)?.details?.status === 'Pending approval'
    ? 'Pending approval'
    : 'Active';

  const statusBg =
    promotionStatus === 'Pending approval'
      ? theme.colors.LIGHT_YELLOW
      : theme.colors.SEMANTIC_GREEN;

  const statusColor =
    promotionStatus === 'Pending approval'
      ? theme.colors.SEMANTIC_YELLOW
      : theme.colors.DARKER_GREEN;

  const promotionLink = isNewStructure
    ? (promotion as PromoRequest)?.promotion?.promotionLink
    : (promotion as Promotion)?.details?.promotionLink;

  const promotionName = promotionLink?.split('/');

  return (
    <Box
      style={styles.promotionContainer}
      onPress={onPress}
      as={TouchableOpacity}
      activeOpacity={0.8}>
      <Image source={theme.images.upload} style={styles.promotionImage} />
      <Box ml={10}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            numberOfLines={1}
            maxWidth={wp(150)}
            color={theme.colors.WHITE}>
            {promotionName?.[promotionName?.length - 1] ??
              (isNewStructure
                ? 'Untitled'
                : (promotion as Promotion)?.title || 'Untitled')}
          </Text>
          <Box ml={10} bg={statusBg} p={1} borderRadius={24}>
            <Text style={{fontSize: fontSz(10)}} color={statusColor}>
              {promotionStatus}
            </Text>
          </Box>
        </Box>
        {/* <Box flexDirection={'row'} mt={2} alignItems={'center'}>
          <Image
            source={theme.images['artist-list']}
            style={styles.sharedList}
            resizeMode="contain"
          />
          <Text
            pl={10}
            variant="body"
            style={{fontSize: fontSz(10)}}
            color={theme.colors.OFF_WHITE_100}>
            {promotion?.sharedWith}
          </Text>
        </Box> */}
        <Box
          flexDirection={'row'}
          alignItems={'center'}
          width={'85%'}
          justifyContent={'space-between'}>
          <Box flexDirection={'row'} mt={hp(2)} alignItems={'center'}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Icon name="play-location" />
              <Text
                variant="body"
                style={{fontSize: fontSz(12), paddingLeft: wp(5)}}
                color={theme.colors.WHITE}>
                {isNewStructure
                  ? (promotion as PromoRequest)?.promotion?.promotersCount || 0
                  : (promotion as Promotion)?.details?.promotersCount ||
                    (promotion as Promotion)?.djCount ||
                    0}
              </Text>
            </Box>
          </Box>

          <Box flexDirection={'row'} mt={hp(2)} alignItems={'center'}>
            <Icon name="calendar-icon-2" />
            <Text
              variant="body"
              style={{fontSize: fontSz(12), paddingLeft: wp(5)}}
              color={theme.colors.WHITE}>
              {isNewStructure
                ? (promotion as PromoRequest)?.promotion?.startDate
                  ? new Date(
                      (promotion as PromoRequest).promotion!.startDate!,
                    ).toLocaleDateString()
                  : 'N/A'
                : (promotion as Promotion)?.details?.startDate
                ? new Date(
                    (promotion as Promotion).details.startDate,
                  ).toLocaleDateString()
                : (promotion as Promotion)?.playlistName || 'N/A'}
            </Text>
          </Box>

          <Box flexDirection={'row'} mt={hp(2)} alignItems={'center'}>
            <Icon name="timeline-icon" />
            <Text
              variant="body"
              style={{fontSize: fontSz(12), paddingLeft: wp(5)}}
              color={theme.colors.WHITE}>
              {isNewStructure
                ? (promotion as PromoRequest)?.promotion?.startDate &&
                  (promotion as PromoRequest)?.promotion?.endDate
                  ? `${Math.ceil(
                      (new Date(
                        (promotion as PromoRequest).promotion!.endDate!,
                      ).getTime() -
                        new Date(
                          (promotion as PromoRequest).promotion!.startDate!,
                        ).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )} days`
                  : 'N/A'
                : (promotion as Promotion)?.details?.startDate &&
                  (promotion as Promotion)?.details?.endDate
                ? `${Math.ceil(
                    (new Date(
                      (promotion as Promotion).details.endDate,
                    ).getTime() -
                      new Date(
                        (promotion as Promotion).details.startDate,
                      ).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )} days`
                : (promotion as Promotion)?.timeline || 'N/A'}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
