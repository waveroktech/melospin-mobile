import React from 'react';
import {Box, Text} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {rateAmount} from 'data';
import {TouchableOpacity} from 'react-native';

interface SelectRateProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (rate: string) => void;
}

export const SelectRate = ({
  isVisible,
  onClose,
  onComplete,
}: SelectRateProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="Select Rate" onClose={onClose} />

        <Box mt={hp(20)} mx={wp(16)}>
          {rateAmount?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                as={TouchableOpacity}
                activeOpacity={0.8}
                height={hp(56)}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                onPress={() => onComplete(item.title)}>
                <Text
                  variant="body"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}>
                  {item.title}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </BaseModal>
  );
};
