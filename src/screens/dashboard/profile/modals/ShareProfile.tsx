import React from 'react';
import {Box, Button, Text} from 'design-system';
import Modal from 'react-native-modal';
import theme from 'theme';
import {deviceWidth, fontSz, hp, wp} from 'utils';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {Image, ImageBackground} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';

interface ShareProfileProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ShareProfile = ({isVisible, onClose}: ShareProfileProps) => {
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
            source={theme.images.artist}
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
                source={theme.images['dj-images']['dj-1']}
                style={styles.djProfileImage}
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
            DJ Zenzee
          </Text>
          <Box top={0.5}>
            <Icon name="verified-icon" />
          </Box>
        </Box>

        <Box>
          <Image source={theme.images.barcode} style={styles.barcode} />
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
