import {Box, Text} from 'design-system';
import React from 'react';
import {TextStyle} from 'react-native';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';

interface HeaderTextProps {
  hasHeaderText: string;
  textStyle?: TextStyle;
  hasSubText?: string;
  width?: number;
  fontSize?: number;
  hasHeaderTextStyle?: TextStyle;
  hasIndicatorLevel?: boolean;
}

export const HeaderText = ({
  hasHeaderText,
  hasSubText,
  width,
  fontSize = fontSz(14),
  hasHeaderTextStyle,
  hasIndicatorLevel,
}: HeaderTextProps) => {
  return (
    <Box px={wp(16)} mt={20}>
      <Text
        variant="bodyMedium"
        fontSize={fontSz(20)}
        color={theme.colors.WHITE}
        style={hasHeaderTextStyle}>
        {hasHeaderText}
      </Text>
      {hasSubText && (
        <Text
          width={width || wp(244)}
          color={theme.colors.TEXT_INPUT_PLACEHOLDER}
          variant={'body'}
          pt={2}
          fontSize={fontSize}>
          {hasSubText}
        </Text>
      )}
      {hasIndicatorLevel && (
        <Box
          mt={hp(12)}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box zIndex={1000}>
            <Icon name="current-indicator" />
          </Box>
          <Box
            borderWidth={1}
            width={'50%'}
            borderColor={theme.colors.WHITE}
            position={'absolute'}
          />
          <Box zIndex={1000}>
            <Icon name="next-indicator" />
          </Box>
          <Box
            borderWidth={1}
            width={'48%'}
            position={'absolute'}
            right={0}
            zIndex={1}
            borderColor={theme.colors.WHITE}
          />
          <Box zIndex={1000}>
            <Icon name="last-indicator" />
          </Box>
        </Box>
      )}
    </Box>
  );
};
