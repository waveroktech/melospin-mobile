import React from 'react';
import {Box, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {rateAmount} from 'data';
import {TouchableOpacity} from 'react-native';

interface SelectRateProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (rate: string) => void;
  selectedRate?: string;
}

export const SelectRate = ({
  isVisible,
  onClose,
  onComplete,
  selectedRate,
}: SelectRateProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="Select Rate" onClose={onClose} />

        <Box mt={hp(20)} mx={wp(16)}>
          {rateAmount?.map((item: any, index: number) => {
            const isSelected = selectedRate === item.title;
            return (
              <Box
                key={index}
                as={TouchableOpacity}
                activeOpacity={0.8}
                height={hp(56)}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                borderBottomWidth={index < rateAmount.length - 1 ? 1 : 0}
                borderBottomColor={theme.colors.BASE_SECONDARY}
                onPress={() => onComplete(item.title)}>
                <Text
                  variant="body"
                  fontFamily={
                    isSelected
                      ? theme.font.AvenirNextSemiBold
                      : theme.font.AvenirNextRegular
                  }
                  color={
                    isSelected ? theme.colors.LIGHT_PRIMARY : theme.colors.WHITE
                  }>
                  {item.title}
                </Text>
                {isSelected && <Icon name="active-checkbox" />}
              </Box>
            );
          })}
        </Box>
      </Box>
    </BaseModal>
  );
};
