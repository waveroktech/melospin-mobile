import {Box, Text} from 'design-system';
import React from 'react';
import {TextStyle} from 'react-native';
import theme from 'theme';
import {fontSz, wp} from 'utils';

interface HeaderTextProps {
  hasHeaderText: string;
  textStyle?: TextStyle;
  hasSubText?: string;
  width?: number;
  fontSize?: number;
}

export const HeaderText = ({
  hasHeaderText,
  hasSubText,
  width,
  fontSize = fontSz(14),
}: HeaderTextProps) => {
  return (
    <Box px={wp(16)} mt={20}>
      <Text
        variant="bodyMedium"
        fontSize={fontSz(20)}
        color={theme.colors.WHITE}>
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
    </Box>
  );
};
