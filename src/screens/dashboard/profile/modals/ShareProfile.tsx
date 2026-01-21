import React from 'react';
import {Box, Button, Text} from 'design-system';
import Modal from 'react-native-modal';
import theme from 'theme';
import {deviceWidth, fontSz, hp, wp} from 'utils';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {Image, ImageBackground} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';
import {useMelospinStore} from 'store';

interface ShareProfileProps {
  isVisible: boolean;
  onClose: () => void;
  qrCodeUrl?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  isLoadingQrCode?: boolean;
}

export const ShareProfile = ({
  isVisible,
  onClose,
  qrCodeUrl,
  profileImageUrl,
  coverImageUrl,
  isLoadingQrCode = false,
}: ShareProfileProps) => {
  const {userData, userInfo} = useMelospinStore();
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <Box
        backgroundColor={theme.colors.ACCENT_04}
        alignSelf={'center'}
        height={hp(539)}
        borderRadius={hp(24)}
        width={deviceWidth - wp(16)}>
        <GradientBorderView
          gradientProps={{
            colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
          }}
          style={styles.gradientContainer}>
          <ImageBackground
            source={
              coverImageUrl
                ? {uri: coverImageUrl}
                : userInfo?.coverUrl
                  ? {uri: userInfo.coverUrl}
                  : theme.images.artist
            }
            imageStyle={styles.imageStyle}
            style={styles.imageContainer}>
            <Box
              bg={theme.colors.OFF_BLACK_200}
              width={deviceWidth - wp(16)}
              p={hp(20)}
              borderRadius={hp(24)}
              height={hp(145)}
            />
          </ImageBackground>
        </GradientBorderView>
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          alignSelf={'center'}
          width={wp(102)}>
          <GradientBorderView
            gradientProps={{
              colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
            }}
            style={styles.profileImageContainer}>
            <Box>
              <Image
                source={
                  profileImageUrl
                    ? {uri: profileImageUrl}
                    : userInfo?.profileUrl
                      ? {uri: userInfo.profileUrl}
                      : theme.images['dj-images']['dj-1']
                }
                style={styles.djProfileImage}
                resizeMode="cover"
              />
            </Box>
          </GradientBorderView>
          <Box
            width={wp(100)}
            position={'absolute'}
            bottom={-hp(30)}
            right={wp(-70)}
            zIndex={1000}>
            <Icon name="edit-icon" />
          </Box>
        </Box>

        <Box
          flexDirection={'row'}
          mt={hp(40)}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text
            variant="bodyMedium"
            fontFamily={theme.font.AvenirNextSemiBold}
            fontSize={fontSz(16)}
            pr={2}
            color={theme.colors.BLACK_DEFAULT}>
            {userData?.brandName}
          </Text>
          <Box top={0.5}>
            <Icon name="verified-icon" />
          </Box>
        </Box>

        <Box>
          {isLoadingQrCode ? (
            <Box
              justifyContent="center"
              alignItems="center"
              height={hp(200)}
              width="100%">
              <Text variant="body" color={theme.colors.BLACK_DEFAULT}>
                Loading QR Code...
              </Text>
            </Box>
          ) : qrCodeUrl ? (
            <Image source={{uri: qrCodeUrl}} style={styles.barcode} />
          ) : (
            <Image source={theme.images.barcode} style={styles.barcode} />
          )}
        </Box>

        <Box
          flexDirection={'row'}
          position={'absolute'}
          bottom={hp(40)}
          mx={wp(16)}
          alignSelf={'center'}
          width={'80%'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Button
            isNotBottom
            onPress={onClose}
            iconName={'arrow-right-4'}
            px={wp(10)}
            hasBorder
            title="Download"
            width={wp(130)}
          />
          <Button
            isNotBottom
            hasBorder
            px={wp(10)}
            onPress={onClose}
            iconName={'arrow-right-4'}
            title="Share"
            width={wp(130)}
          />
        </Box>
      </Box>
    </Modal>
  );
};
