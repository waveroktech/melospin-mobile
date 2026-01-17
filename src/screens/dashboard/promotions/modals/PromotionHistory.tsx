import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Icon, ModalHeader} from 'shared';
import {capitalizeTitle, deviceWidth, fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {DiscographyItem} from 'screens/dashboard/discography/component';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import {Promotion} from 'interfaces/services';

interface PromotionHistoryProps {
  isVisible: boolean;
  onClose: () => void;
  promotion: Promotion | null;
}

export const PromotionHistory = ({
  isVisible,
  onClose,
  promotion,
}: PromotionHistoryProps) => {
  const [showPromotionDetails, setShowPromotionDetails] = useState(true);
  const [showPromotionStatusReport, setShowPromotionStatusReport] =
    useState(true);

  // Format promotion data for DiscographyItem
  const promotionData = promotion
    ? {
        _id: promotion._id,
        title: promotion.title || 'Untitled',
        primaryArtiste: promotion.details?.owner?.firstName || 'Unknown',
        otherArtistes: [],
        fileType: 'zip',
        url: promotion.details?.promotionLink || '',
        userId: promotion.details?.owner?.promoterId || '',
        createdAt: promotion.details?.createdAt || '',
        updatedAt: promotion.details?.createdAt || '',
        name: '', // Required by DiscographyItem interface
      }
    : null;

  // Calculate timeline from start and end dates
  const getTimeline = () => {
    if (!promotion?.details?.startDate || !promotion?.details?.endDate) {
      return promotion?.timeline || 'N/A';
    }
    const start = moment(promotion.details.startDate);
    const end = moment(promotion.details.endDate);
    const months = end.diff(start, 'months');
    const days = end.diff(start, 'days');
    if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  };

  // Get external links from promotion
  const externalLinks =
    (promotion?.details as any)?.externalLinks?.length > 0
      ? (promotion?.details as any).externalLinks.map((link: any) => ({
          icon2: 'link-icon',
          name: link.name || 'Link',
          url: link.link || link.url || '',
        }))
      : [];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationOutTiming={400}>
      <Box
        py={hp(20)}
        flex={1}
        bg={theme.colors.BASE_PRIMARY}
        top={hp(80)}
        borderTopLeftRadius={hp(24)}
        borderTopRightRadius={hp(24)}
        alignSelf={'center'}
        width={deviceWidth}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          iconName="back-icon"
          modalHeaderText="Promotion Details"
        />
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp(120)}}>
          <Box mt={hp(20)}>
            <Text
              variant="bodyMedium"
              color={theme.colors.WHITE}
              px={wp(16)}
              pb={hp(12)}>
              File shared
            </Text>

            {promotionData && <DiscographyItem item={promotionData} />}
          </Box>
          {externalLinks && externalLinks.length > 0 && (
            <Box mt={hp(20)} mx={wp(16)}>
              <Text
                variant="bodyBold"
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}>
                Streaming Links
              </Text>

              <ScrollView horizontal>
                <Box mt={hp(16)} flexDirection={'row'} alignItems={'center'}>
                  {externalLinks.map((link: any, index: number) => {
                    return (
                      <Box
                        as={TouchableOpacity}
                        backgroundColor={theme.colors.BLACK_DEFAULT}
                        activeOpacity={0.8}
                        key={index}
                        mr={wp(10)}
                        borderRadius={hp(24)}
                        borderWidth={1}
                        borderColor={theme.colors.WHITE}
                        p={hp(12)}>
                        <Icon
                          name={link.icon2 || 'link-icon'}
                          color={theme.colors.WHITE}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </ScrollView>
            </Box>
          )}
          <Box mt={hp(32)}>
            <Box
              mx={wp(16)}
              bg={theme.colors.OFF_PRIMARY_200}
              p={hp(24)}
              borderRadius={hp(24)}>
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => setShowPromotionDetails(!showPromotionDetails)}
                flexDirection={'row'}
                mb={showPromotionDetails ? hp(16) : 0}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Text variant="bodyMedium" color={theme.colors.WHITE}>
                  Promotion Details
                </Text>

                <Box>
                  <Icon
                    name={showPromotionDetails ? 'arrow-up-2' : 'arrow-down-2'}
                  />
                </Box>
              </Box>
              {showPromotionDetails && (
                <Box style={[styles.accordionContent]}>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    py={hp(12)}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="bodyMedium"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Promo Start Date
                    </Text>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      {promotion?.details?.startDate
                        ? moment(promotion.details.startDate).format('MM/DD/YYYY')
                        : 'N/A'}
                    </Text>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    py={hp(12)}
                    borderBottomWidth={1}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="bodyMedium"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Amount Paid (NGN)
                    </Text>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      {promotion?.details?.amount
                        ? formatNumberWithCommas(
                            promotion.details.amount.toFixed(2),
                          )
                        : '0.00'}
                    </Text>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    py={hp(12)}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="bodyMedium"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Assigned DJs
                    </Text>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      {promotion?.djCount ||
                        promotion?.details?.promotersCount ||
                        0}
                    </Text>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    py={hp(12)}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="bodyMedium"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Promotion Timeline
                    </Text>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      {getTimeline()}
                    </Text>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    py={hp(12)}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="bodyMedium"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Min. Play Count
                    </Text>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      {promotion?.details?.minPlayCount || 0}
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Box mt={hp(32)}>
            <Box
              mx={wp(16)}
              bg={theme.colors.OFF_PRIMARY_200}
              p={hp(24)}
              borderRadius={hp(24)}>
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() =>
                  setShowPromotionStatusReport(!showPromotionStatusReport)
                }
                flexDirection={'row'}
                mb={showPromotionStatusReport ? hp(16) : 0}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Text variant="bodyMedium" color={theme.colors.WHITE}>
                  Promotion Status Report
                </Text>

                <Box>
                  <Icon
                    name={
                      showPromotionStatusReport ? 'arrow-up-2' : 'arrow-down-2'
                    }
                  />
                </Box>
              </Box>
              {showPromotionStatusReport && (
                <Box style={[styles.accordionContent]}>
                  {promotion?.statusReport && promotion.statusReport.length > 0
                    ? promotion.statusReport.map((report: any, index: number) => {
                        const statusColors: {
                          [key: string]: {bg: string; text: string};
                        } = {
                          pending: {
                            bg: theme.colors.CREAM,
                            text: theme.colors.SEMANTIC_YELLOW,
                          },
                          accepted: {
                            bg: theme.colors.SEMANTIC_GREEN,
                            text: theme.colors.DARKER_GREEN,
                          },
                          declined: {
                            bg: theme.colors.RED,
                            text: theme.colors.WHITE,
                          },
                        };
                        const statusColor =
                          statusColors[report.status?.toLowerCase()] ||
                          statusColors.pending;
                        return (
                          <Box
                            key={report.reportId || index}
                            flexDirection={'row'}
                            alignItems={'center'}
                            borderBottomWidth={1}
                            py={hp(12)}
                            borderBottomColor={theme.colors.BASE_SECONDARY}
                            justifyContent={'space-between'}>
                            <Text
                              variant="bodyMedium"
                              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                              {capitalizeTitle(report.brandName) ||
                                `${capitalizeTitle(report.firstName)} ${capitalizeTitle(report.lastName)}`}
                            </Text>
                            <Box
                              bg={statusColor.bg}
                              style={{
                                paddingHorizontal: wp(6),
                                paddingVertical: hp(4),
                              }}
                              borderRadius={hp(10)}>
                              <Text
                                variant="bodyMedium"
                                fontSize={fontSz(12)}
                                color={statusColor.text}>
                                {capitalizeTitle(report.status) || 'Pending'}
                              </Text>
                            </Box>
                          </Box>
                        );
                      })
                    : (
                        <Box
                          py={hp(24)}
                          alignItems={'center'}
                          justifyContent={'center'}>
                          <Icon name="empty-folder" />
                          <Text
                            variant="bodyMedium"
                            color={theme.colors.TEXT_INPUT_PLACEHOLDER}
                            mt={hp(12)}
                            textAlign={'center'}>
                            No status reports available
                          </Text>
                          <Text
                            variant="body"
                            fontSize={12}
                            color={theme.colors.GREY}
                            mt={hp(8)}
                            textAlign={'center'}
                            px={wp(16)}>
                            Status reports will appear here once DJs start
                            playing your promotion
                          </Text>
                        </Box>
                      )}
                </Box>
              )}
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  accordionContent: {
    overflow: 'hidden',
  },
});
