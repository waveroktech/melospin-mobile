import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Icon, ModalHeader} from 'shared';
import {deviceWidth, hp, wp} from 'utils';
import theme from 'theme';
import {DiscographyItem} from 'screens/dashboard/discography/component';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {promotionStatusReport, streamingLinks} from 'data';
import Modal from 'react-native-modal';

interface PromotionHistoryProps {
  isVisible: boolean;
  onClose: () => void;
  promotion: any;
}

export const PromotionHistory = ({
  isVisible,
  onClose,
  promotion,
}: PromotionHistoryProps) => {
  const [showPromotionDetails, setShowPromotionDetails] = useState(true);
  const [showPromotionStatusReport, setShowPromotionStatusReport] =
    useState(true);
  const promotionData = {
    ...promotion,
    title: 'Baddest.zip',
    otherArtistes: ['Falz', 'Adekunle Gold'],
    primaryArtiste: 'Falz',
    fileType: 'zip',
    url: 'https://www.google.com',
    userId: '123',
    _id: '123',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  };

  console.log(promotionData);
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

            <DiscographyItem item={promotionData} />
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
                {streamingLinks?.map((song: any, index: number) => {
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
                      10/10/2025
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
                      1,500,000.00
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
                      5
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
                      1 month
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
                      12
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
                    name={showPromotionDetails ? 'arrow-up-2' : 'arrow-down-2'}
                  />
                </Box>
              </Box>
              {showPromotionStatusReport && (
                <Box style={[styles.accordionContent]}>
                  {promotionStatusReport?.map((item: any) => {
                    return (
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
                          {item.title}
                        </Text>
                        <Box
                          bg={item.statusBg}
                          style={{
                            paddingHorizontal: wp(6),
                            paddingVertical: hp(4),
                          }}
                          borderRadius={hp(10)}>
                          <Text
                            variant="bodyMedium"
                            color={item.statusTextColor}>
                            {item.status}
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

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  accordionContent: {
    overflow: 'hidden',
  },
});
