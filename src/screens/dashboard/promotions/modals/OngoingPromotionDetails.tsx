import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Icon, ModalHeader} from 'shared';
import {deviceWidth, fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {proofOfPlay, streamingLinks} from 'data';
import Modal from 'react-native-modal';
import {ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './style';

interface OngoingPromotionDetailsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const OngoingPromotionDetails = ({
  isVisible,
  onClose,
}: OngoingPromotionDetailsProps) => {
  const [showPromotionDetails, setShowPromotionDetails] = useState(true);
  const [showProofOfPlay, setShowProofOfPlay] = useState(true);

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
        // height={hp(600)}
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

                  <Box ml={wp(12)}>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      Who go pay
                    </Text>
                    <Text variant="body" color={theme.colors.OFF_WHITE_100}>
                      Falz feat. Adekunle Gold
                    </Text>
                    <Text variant="body" color={theme.colors.WHITE}>
                      MP3 File
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
                        Amount to earn
                      </Text>
                      <Text variant="bodyMedium" color={theme.colors.WHITE}>
                        200,000.00
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

            <Box
              mt={hp(30)}
              mx={wp(16)}
              borderWidth={1}
              borderColor={theme.colors.BASE_SECONDARY}
              borderRadius={hp(24)}
              flexDirection={'row'}
              as={TouchableOpacity}
              activeOpacity={0.8}
              alignItems={'center'}
              p={hp(16)}>
              <Box
                width={wp(56)}
                height={hp(56)}
                borderRadius={hp(12)}
                bg={theme.colors.OFF_BLACK_300}
                alignItems={'center'}
                justifyContent={'center'}>
                <Icon name="video-icon" />
              </Box>

              <Text
                variant="body"
                color={theme.colors.WHITE}
                ml={wp(12)}
                fontSize={fontSz(12)}>
                Click here to Upload Proof of Play
              </Text>
            </Box>

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
                  Proof of Play Report (1/12)
                </Text>

                <Box>
                  <Icon
                    name={showProofOfPlay ? 'arrow-up-2' : 'arrow-down-2'}
                  />
                </Box>
              </Box>

              {showProofOfPlay && (
                <Box mt={hp(12)}>
                  {proofOfPlay?.map((item: any) => {
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
                            color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                            {item.title}
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
                            {item.date}
                          </Text>
                        </Box>

                        <Box
                          bg={item.statusBg}
                          p={hp(4)}
                          borderRadius={hp(10)}
                          borderWidth={item.statusBgBorder ? 1 : 0}
                          borderColor={item.statusBgBorder}>
                          <Text
                            variant="bodyMedium"
                            px={wp(4)}
                            style={{fontSize: fontSz(10)}}
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
