import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {styles} from './style';
import {Image, TouchableOpacity} from 'react-native';
import {capitalizeTitle, fontSz, hp, wp} from 'utils';
import {Icon} from 'shared';
import moment from 'moment';

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
  discograph: any;
  statusReport?: StatusReport[];
  details: any;
  title?: string;
  djCount?: number;
  playlistName?: string;
  timeline?: string;
}

// New structure for promo requests
interface PromoRequest {
  discograph: any;
  details: PromotionDetails;
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
  console.log(promotion, 'promotion');

  // Helper function to get promotion status
  const getPromotionStatus = (promo: Promotion | PromoRequest): string => {
    if (isNewStructure) {
      const promoRequest = promo as PromoRequest;
      if (
        promoRequest?.playInfo?.requestStatus === 'pending' ||
        promoRequest?.playInfo?.promoStatus === 'pending'
      ) {
        return 'Pending approval';
      }
      return 'Active';
    }

    const promoItem = promo as Promotion;
    // Check if statusReport exists and has items
    // if (promoItem?.statusReport && promoItem.statusReport.length > 0) {
    //   const statusReportStatus = promoItem.statusReport[0].status?.toLowerCase();
    //   // Map statusReport status to display status
    //   if (statusReportStatus === 'pending') {
    //     return 'Pending approval';
    //   }
    //   if (statusReportStatus === 'accepted') {
    //     return 'Active';
    //   }
    //   if (statusReportStatus === 'declined') {
    //     return 'Declined';
    //   }
    // }

    // Fall back to details.status
    const detailsStatus = promoItem?.details?.status?.toLowerCase();
    if (detailsStatus === 'pending' || detailsStatus === 'pending approval') {
      return 'Pending approval';
    }
    return 'Active';
  };

  const promotionStatus = getPromotionStatus(promotion);

  const statusBg =
    promotionStatus === 'Pending approval'
      ? theme.colors.LIGHT_YELLOW
      : promotionStatus === 'Declined'
      ? theme.colors.ERROR_TONE
      : theme.colors.SEMANTIC_GREEN;

  const statusColor =
    promotionStatus === 'Pending approval'
      ? theme.colors.SEMANTIC_YELLOW
      : promotionStatus === 'Declined'
      ? theme.colors.DANGER_BORDER
      : theme.colors.DARKER_GREEN;

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
            {capitalizeTitle(promotion?.discograph?.title || promotion?.details?.discograph?.title)}
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
                  ? `${Math.round(
                      moment(
                        (promotion as PromoRequest).promotion!.endDate!,
                      ).diff(
                        moment(
                          (promotion as PromoRequest).promotion!.startDate!,
                        ),
                        'months',
                        true,
                      ),
                    )} months`
                  : 'N/A'
                : (promotion as Promotion)?.details?.startDate &&
                  (promotion as Promotion)?.details?.endDate
                ? `${Math.round(
                    moment((promotion as Promotion).details.endDate).diff(
                      moment((promotion as Promotion).details.startDate),
                      'months',
                      true,
                    ),
                  )} months`
                : (promotion as Promotion)?.timeline || 'N/A'}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
