import React from 'react';
import {Box, BoxProps, Text} from 'design-system';
import {Icon} from 'shared';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fontSz, hp, populateHitSlop, wp} from 'utils';
import {RootStackParamList} from 'types';
import theme from 'theme';

interface headerProps {
  hasBackButton?: boolean;
  hasRightIcon?: React.ReactElement;
  onPressRightIcon?: () => void;
  onPressLeftIcon?: () => void;
  containerProps?: BoxProps;
  hasHeaderText?: string;
  hasSubHeaderText?: string;
  width?: number;
  textVariant?: 'bodySmall' | 'smallBold';
  goBackText?: string;
  hasHeaderIcon?: boolean;
  hasGoForward?: string;
  hasBackText?: string;
}

export const Header = ({
  hasBackButton,
  hasRightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  containerProps,
  goBackText,
  hasHeaderIcon,
  hasGoForward,
  hasBackText,
}: headerProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderHeaderLeft = () => {
    if (hasBackButton && navigation.canGoBack()) {
      return (
        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          position={'absolute'}
          left={0}
          borderWidth={1}
          minWidth={wp(90)}
          px={wp(10)}
          height={hp(40)}
          borderRadius={hp(24)}
          borderColor={theme.colors.ACCENT_04}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          hitSlop={populateHitSlop(5)}
          onPress={() =>
            onPressLeftIcon ? onPressLeftIcon() : navigation.goBack()
          }>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}>
            {goBackText}
          </Text>
          <Icon name="back-arrow" />
        </Box>
      );
    }

    if (hasBackText) {
      return (
        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          flexDirection={'row'}
          alignItems={'center'}
          position={'absolute'}
          hitSlop={populateHitSlop(5)}
          onPress={() =>
            onPressLeftIcon ? onPressLeftIcon() : navigation.goBack()
          }
          left={0}>
          <Box
            borderWidth={1}
            px={wp(10)}
            height={hp(40)}
            borderRadius={hp(24)}
            borderColor={theme.colors.ACCENT_04}
            flexDirection={'row'}
            alignItems={'center'}>
            <Icon name="back-arrow" />
          </Box>

          <Text
            pl={wp(16)}
            variant="bodyMedium"
            fontSize={fontSz(16)}
            fontFamily={theme.font.AvenirNextSemiBold}
            color={theme.colors.WHITE}>
            {hasBackText}
          </Text>
        </Box>
      );
    }

    if (hasHeaderIcon) {
      return (
        <Box position={'absolute'} left={0}>
          <Icon name="melospin-icon" />
        </Box>
      );
    }
  };

  const renderHeaderRight = () => {
    if (hasRightIcon) {
      return (
        <Box
          position={'absolute'}
          right={0}
          onPress={onPressRightIcon}
          hitSlop={populateHitSlop(5)}
          activeOpacity={0.8}
          as={TouchableOpacity}>
          {hasRightIcon}
        </Box>
      );
    }
    if (hasGoForward) {
      return (
        <Box
          position={'absolute'}
          right={0}
          borderWidth={1}
          minWidth={wp(114)}
          px={wp(10)}
          height={hp(40)}
          borderRadius={hp(24)}
          borderColor={theme.colors.ACCENT_04}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          onPress={onPressRightIcon}
          hitSlop={populateHitSlop(5)}
          activeOpacity={0.8}
          as={TouchableOpacity}>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}>
            {hasGoForward}
          </Text>
          <Icon name="forward-arrow" />
        </Box>
      );
    }
  };

  return (
    <Box>
      <Box {...containerProps} px={16}>
        <Box
          height={55}
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'center'}>
          {renderHeaderLeft()}
          {renderHeaderRight()}
        </Box>
      </Box>
    </Box>
  );
};
