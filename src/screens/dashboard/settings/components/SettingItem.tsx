import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp} from 'utils';
import {Switch, TouchableOpacity, View} from 'react-native';
import {Icon} from 'shared';

interface SettingItemProps {
  title: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  value?: boolean;
  setValue?: (value?: boolean) => void;
}

export const SettingItem = ({
  title,
  hasSwitch,
  onPress,
  value,
  setValue,
}: SettingItemProps) => {
  return (
    <Box
      as={hasSwitch ? View : TouchableOpacity}
      activeOpacity={0.8}
      onPress={onPress}
      height={hp(74)}
      mb={hp(20)}
      bg={theme.colors.PRIMARY_200}
      p={hp(22)}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={hp(22)}>
      <Text
        variant="bodyMedium"
        color={theme.colors.WHITE}
        fontSize={fontSz(14)}>
        {title}
      </Text>

      {hasSwitch ? (
        <Switch
          value={value}
          onValueChange={() => setValue?.(!value)}
          trackColor={{
            true: theme.colors.LIGHT_PRIMARY,
          }}
        />
      ) : (
        <Icon name="chevron-right" />
      )}
    </Box>
  );
};
