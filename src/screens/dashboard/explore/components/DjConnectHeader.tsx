import React from 'react';
import {Box, Button, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Image} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';
import {GradientBorderView} from '@good-react-native/gradient-border';

interface DjConnectHeaderProps {
  onPress: () => void;
}

export const DjConnectHeader = ({onPress}: DjConnectHeaderProps) => {
  return (
    <Box
      bg={theme.colors.BASE_SECONDARY}
      px={hp(10)}
      py={hp(14)}
      mx={wp(16)}
      mt={hp(20)}
      borderRadius={hp(24)}>
      <Box flexDirection={'row'} justifyContent={'space-between'}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Image
            source={theme.images['dj-images']['dj-1']}
            style={styles.djProfileImage}
          />

          <Box ml={wp(10)}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text
                variant="bodyMedium"
                fontSize={fontSz(16)}
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}>
                DJ Zenzee
              </Text>
              <Box top={0.5} ml={1}>
                <Icon name="verified" />
              </Box>
            </Box>
            <Text
              pt={hp(10)}
              variant="body"
              fontSize={fontSz(16)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              @djzenzee
            </Text>
          </Box>
        </Box>

        <GradientBorderView
          gradientProps={{
            colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
          }}
          style={styles.djProfileContainer}>
          <Icon name="dj-icon" />
          <Text variant="bodyMedium" color={theme.colors.WHITE} px={1}>
            DJ
          </Text>
        </GradientBorderView>
      </Box>
      <Box
        mt={hp(20)}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Box
          flexDirection={'row'}
          alignSelf={'flex-start'}
          borderRadius={hp(24)}
          height={hp(40)}
          px={wp(2)}
          width={wp(145)}
          bg={theme.colors.BASE_SECONDARY}
          alignItems={'center'}>
          <Icon name="dj-connects" />
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}
            px={1}>
            100 Connects
          </Text>
        </Box>
        <Box
          flexDirection={'row'}
          height={hp(40)}
          px={wp(2)}
          width={wp(160)}
          alignSelf={'flex-start'}
          borderRadius={hp(24)}
          bg={theme.colors.BASE_SECONDARY}
          alignItems={'center'}>
          <Icon name="dj-join-date" />
          <Text
            variant="bodyMedium"
            fontSize={fontSz(13)}
            color={theme.colors.WHITE}
            px={1}>
            Joined Oct 2024
          </Text>
        </Box>
      </Box>

      <Button
        isNotBottom
        mt={hp(20)}
        width={wp(320)}
        icon="connection-count"
        onPress={onPress}
        title={'Connection Requests (10+)'}
        fontStyle={{
          paddingLeft: wp(10),
          fontSize: fontSz(14),
          fontFamily: theme.font.AvenirNextSemiBold,
        }}
        hasBorder
        bg={theme.colors.BASE_PRIMARY}
      />
    </Box>
  );
};
