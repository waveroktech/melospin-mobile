import React, {useEffect, useMemo, useState} from 'react';
import {Box, Text} from 'design-system';
import {Icon, Loader, ModalHeader} from 'shared';
import {capitalizeTitle, deviceWidth, fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {streamingLinks} from 'data';
import Modal from 'react-native-modal';
import {ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {PromoRequest} from 'interfaces/services';
import moment from 'moment';
import {useGetPromotion} from 'store';
import {ProofOfPlayUpload} from '../components';

interface OngoingPromotionDetailsProps {
  isVisible: boolean;
  promotion: PromoRequest | null;
  onClose: () => void;
}

export const OngoingPromotionDetails = ({
  isVisible,
  promotion,
  onClose,
}: OngoingPromotionDetailsProps) => {
  const [showPromotionDetails, setShowPromotionDetails] = useState(true);
  const [showProofOfPlay, setShowProofOfPlay] = useState(true);

  // Get promotion ID from the promotion prop
  const promotionId =
    promotion?.promotion?._id || promotion?.playInfo?.playId || null;

  // Get request ID for proof of play upload
  const requestId = promotion?.playInfo?.playId || null;

  // Fetch promotion details using the query hook
  const {
    data: promotionData,
    isLoading,
    isError,
    refetch,
  } = useGetPromotion(promotionId, isVisible && !!promotionId);

  // Refetch when modal opens to ensure fresh data
  useEffect(() => {
    if (isVisible && promotionId) {
      console.log('Fetching promotion details for ID:', promotionId);
      refetch();
    }
  }, [isVisible, promotionId, refetch]);

  // Use fetched data if available, otherwise fall back to prop data
  // API response structure: { _id, statusReport[], details: {...} }
  const promotionDetails = promotionData?.data || promotion;
  const details = promotionDetails?.details || promotionDetails?.promotion;
  const statusReport = useMemo(
    () => promotionDetails?.proofs || [],
    [promotionDetails?.proofs],
  );

  console.log(promotion?.proofs);

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
          modalHeaderText="Ongoing Promotion Details"
        />
        <Loader loading={isLoading} />
        {isError && (
          <Box px={wp(16)} py={hp(20)}>
            <Text variant="body" color={theme.colors.RED}>
              Failed to load promotion details
            </Text>
          </Box>
        )}
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp(120)}}>
          <Box>
            <Box mt={hp(20)}>
              <Text
                variant="bodyMedium"
                px={wp(16)}
                pb={hp(12)}
                fontFamily={theme.font.AvenirNextMedium}
                color={theme.colors.WHITE}>
                File shared
              </Text>

              <Box
                bg={theme.colors.OFF_BLACK_100}
                p={hp(16)}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mx={wp(16)}
                borderRadius={hp(24)}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <ImageBackground
                    source={theme.images.upload}
                    imageStyle={styles.uploadCoverImage}
                    style={styles.uploadCover}>
                    <Icon name="file-upload" color={theme.colors.WHITE} />
                  </ImageBackground>

                  <Box ml={wp(12)} width={wp(200)}>
                    <Text
                      variant="bodyMedium"
                      color={theme.colors.WHITE}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {capitalizeTitle(promotion?.discograph?.title) || 'N/A'}
                    </Text>
                    <Text variant="body" color={theme.colors.OFF_WHITE_100}>
                      {(() => {
                        const firstName =
                          details?.owner?.firstName ||
                          promotionDetails?.owner?.firstName ||
                          '';
                        const lastName =
                          details?.owner?.lastName ||
                          promotionDetails?.owner?.lastName ||
                          '';
                        const capitalize = (str: string) =>
                          str.charAt(0).toUpperCase() +
                          str.slice(1).toLowerCase();
                        return `${capitalize(firstName)} ${capitalize(
                          lastName,
                        )}`.trim();
                      })()}
                    </Text>
                    <Text variant="body" color={theme.colors.WHITE}>
                      {details?.promotionTypes
                        ?.map((type: string) =>
                          type
                            .split(' ')
                            .map(
                              (word: string) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase(),
                            )
                            .join(' '),
                        )
                        .join(', ') || 'N/A'}
                    </Text>
                  </Box>
                </Box>

                <Box
                  width={wp(37)}
                  height={hp(37)}
                  borderWidth={1}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderColor={theme.colors.OFF_WHITE_700}
                  borderRadius={hp(24)}>
                  <Icon name="link-icon" />
                </Box>
              </Box>
            </Box>

            <Box mt={hp(20)} mx={wp(16)}>
              <Text
                variant="bodyBold"
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}>
                Streaming Links
              </Text>

              <ScrollView horizontal>
                <Box mt={hp(16)} flexDirection={'row'} alignItems={'center'}>
                  {details?.externalPlatformsLink &&
                  details.externalPlatformsLink.length > 0
                    ? details.externalPlatformsLink.map(
                        (link: any, index: number) => {
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
                                name="link-icon"
                                color={theme.colors.WHITE}
                              />
                            </Box>
                          );
                        },
                      )
                    : streamingLinks?.map((song: any, index: number) => {
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
                              name={song.icon2}
                              color={theme.colors.WHITE}
                            />
                          </Box>
                        );
                      })}
                </Box>
              </ScrollView>
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
                      name={
                        showPromotionDetails ? 'arrow-up-2' : 'arrow-down-2'
                      }
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
                        {details?.startDate
                          ? moment(details.startDate).format('MM/DD/YYYY')
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
                        Amount to earn
                      </Text>
                      <Text variant="bodyMedium" color={theme.colors.WHITE}>
                        NGN{' '}
                        {formatNumberWithCommas(
                          details?.bidAmount?.toString() ||
                            promotionDetails?.playInfo?.bidAmount?.toString() ||
                            '0',
                        )}
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
                        {details?.startDate && details?.endDate
                          ? `${Math.round(
                              moment(details.endDate).diff(
                                moment(details.startDate),
                                'months',
                                true,
                              ),
                            )} months`
                          : 'N/A'}
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
                        {details?.minPlayCount || 0}
                      </Text>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box
                flexDirection={'row'}
                alignItems={'center'}
                mt={hp(12)}
                mx={wp(16)}>
                <Icon name="info-icon" />
                <Text
                  variant="body"
                  color={theme.colors.WHITE}
                  ml={wp(12)}
                  fontSize={fontSz(12)}>
                  The promotion will be played at least 12 different times each
                  month, with proof verified by our team.
                </Text>
              </Box>
            </Box>

            <ProofOfPlayUpload
              requestId={requestId}
              onUploadSuccess={refetch}
            />

            <Box
              mt={hp(30)}
              mx={wp(16)}
              bg={theme.colors.OFF_PRIMARY_200}
              p={hp(24)}
              borderRadius={hp(24)}>
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => setShowProofOfPlay(!showProofOfPlay)}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Text variant="bodyMedium" color={theme.colors.WHITE}>
                  Proof of Play Report ({promotion?.proofs?.length || 0}/
                  {details?.minPlayCount || 12})
                </Text>

                <Box>
                  <Icon
                    name={showProofOfPlay ? 'arrow-up-2' : 'arrow-down-2'}
                  />
                </Box>
              </Box>

              {showProofOfPlay && (
                <Box mt={hp(12)}>
                  {promotion?.proofs?.map((item: any) => {
                        return (
                          <Box
                            key={item.id}
                            flexDirection={'row'}
                            alignItems={'center'}
                            mb={hp(12)}
                            borderBottomWidth={1}
                            borderBottomColor={theme.colors.BASE_SECONDARY}
                            pb={hp(16)}
                            justifyContent={'space-between'}>
                            <Box flexDirection={'row'} alignItems={'center'}>
                              <Text
                                variant="bodyMedium"
                                numberOfLines={1}
                                width={wp(100)}
                                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                                {item.fileName}
                              </Text>
                              <Box
                                width={wp(4)}
                                height={hp(4)}
                                mx={wp(12)}
                                bg={theme.colors.TEXT_INPUT_PLACEHOLDER}
                                borderRadius={hp(10)}
                              />
                              <Text
                                variant="bodyMedium"
                                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                                {moment(item.createdAt).format('MM/DD/YYYY')}
                              </Text>
                            </Box>

                            <Box
                              bg={
                                item.requestStatus === 'accepted'
                                  ? theme.colors.SEMANTIC_GREEN
                                  : item.requestStatus === 'pending'
                                  ? theme.colors.CREAM
                                  : theme.colors.RED
                              }
                              style={{
                                paddingHorizontal: wp(6),
                                paddingVertical: hp(4),
                              }}
                              borderRadius={hp(10)}>
                              <Text
                                variant="bodyMedium"
                                fontSize={fontSz(12)}
                                color={
                                  item.requestStatus === 'accepted'
                                    ? theme.colors.DARKER_GREEN
                                    : item.requestStatus === 'pending'
                                    ? theme.colors.SEMANTIC_YELLOW
                                    : theme.colors.WHITE
                                }>
                                {item.requestStatus}
                              </Text>
                            </Box>
                          </Box>
                        );
                      })}
                </Box>
              )}
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </Modal>
  );
};
