import React from 'react';
import {Box, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import {frequency} from 'data';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';

interface SelectFrequencyProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (value: string) => void;
}

export const SelectFrequency = ({
  isVisible,
  onClose,
  onComplete,
}: SelectFrequencyProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="Frequency" onClose={onClose} />

        <Box mt={hp(20)} mx={wp(16)}>
          {frequency?.map(item => {
            return (
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => onComplete(item.title)}
                height={hp(56)}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Text
                  variant="body"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}>
                  {item?.title}
                </Text>
                <Icon name="arrow-right-small" />
              </Box>
            );
          })}
        </Box>
      </Box>
    </BaseModal>
  );
};
