import React from 'react';
import {Box, BoxProps, Text} from 'design-system';
import {Icon} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';

interface EmptyPromotionContainerProps {
  containerStyles?: BoxProps;
  title?: string;
  subTitle?: string;
  icon: string;
}

export const EmptyPromotionContainer = ({
  containerStyles,
  title,
  subTitle,
  icon,
}: EmptyPromotionContainerProps) => {
  return (
    <Box
      width={wp(252)}
      height={hp(100)}
      justifyContent={'center'}
      alignItems={'center'}
      alignSelf={'center'}
      my={hp(170)}
      {...containerStyles}>
      <Icon name={icon} />
      <Text
        pt={2}
        fontSize={fontSz(16)}
        variant="bodyMedium"
        fontFamily={theme.font.AvenirNextSemiBold}
        color={theme.colors.WHITE}>
        {title}
      </Text>
      <Text
        pt={2}
        variant="body"
        fontSize={fontSz(12)}
        color={theme.colors.GREY}
        textAlign={'center'}>
        {subTitle}
      </Text>
    </Box>
  );
};
