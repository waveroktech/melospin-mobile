import React from 'react';
import {Box, Button, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {PromotionItem} from '../components';
import {streamingLinks} from 'data';
import {PromoRequest} from 'interfaces/services';
import {formatNumberWithCommas} from 'utils';

interface PromotionDetailsProps {
  isVisible: boolean;
  promotion: PromoRequest | null;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export const PromotionDetails = ({
  isVisible,
  promotion,
  onClose,
  onAccept,
  onDecline,
}: PromotionDetailsProps) => {
  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BASE_PRIMARY,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          iconName="back-icon"
          modalHeaderText="Promotion Request Details"
        />

        <Box mt={hp(20)}>
          <Text
            px={wp(16)}
            variant="bodyMedium"
            fontFamily={theme.font.AvenirNextMedium}
            color={theme.colors.WHITE}>
            Client
          </Text>

          <Box mt={hp(12)} px={wp(16)}>
            <GradientBorderView
              gradientProps={{
                colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
              }}
              style={styles.gradientContainer}>
              <Image
                source={theme.images.artist}
                style={styles.imageContainer}
              />

              <Text
                variant="body"
                fontFamily={theme.font.AvenirNextRegular}
                color={theme.colors.WHITE}>
                {promotion?.owner?.brandName ||
                  promotion?.owner?.firstName ||
                  'N/A'}
              </Text>
            </GradientBorderView>
          </Box>

          <Box mt={hp(20)}>
            <Text
              variant="bodyMedium"
              px={wp(16)}
              pb={hp(12)}
              fontFamily={theme.font.AvenirNextMedium}
              color={theme.colors.WHITE}>
              Audio file
            </Text>

            {promotion && <PromotionItem promotion={promotion} />}
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
                {promotion?.promotion?.externalPlatformsLink &&
                promotion.promotion.externalPlatformsLink.length > 0
                  ? promotion.promotion.externalPlatformsLink.map(
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
                            <Icon name="link-icon" color={theme.colors.WHITE} />
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
                          <Icon name={song.icon2} color={theme.colors.WHITE} />
                        </Box>
                      );
                    })}
              </Box>
            </ScrollView>
          </Box>

          <Box mt={hp(20)}>
            <Text
              variant="bodyMedium"
              px={wp(16)}
              pb={hp(12)}
              fontFamily={theme.font.AvenirNextMedium}
              color={theme.colors.WHITE}>
              Promotion Details
            </Text>

            <Box
              mx={wp(16)}
              bg={theme.colors.OFF_PRIMARY_200}
              p={hp(16)}
              borderRadius={hp(24)}>
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
                  Amount
                </Text>
                <Text variant="bodyMedium" color={theme.colors.WHITE}>
                  NGN{' '}
                  {formatNumberWithCommas(
                    promotion?.playInfo?.bidAmount?.toString() || '0',
                  )}
                </Text>
              </Box>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                py={hp(12)}
                borderBottomColor={theme.colors.BASE_SECONDARY}
                justifyContent={'space-between'}>
                <Text
                  variant="bodyMedium"
                  color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                  Play count
                </Text>
                <Text variant="bodyMedium" color={theme.colors.WHITE}>
                  {promotion?.promotion?.minPlayCount || 0}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          mt={hp(20)}
          flexDirection={'row'}
          mx={wp(16)}
          mb={hp(20)}
          justifyContent={'space-between'}>
          <Button
            isNotBottom
            width={wp(160)}
            hasIcon
            title="Decline"
            onPress={onDecline}
          />
          <Button
            isNotBottom
            width={wp(160)}
            title="Accept"
            hasBorder
            onPress={onAccept}
          />
        </Box>
      </Box>
    </BaseModal>
  );
};
