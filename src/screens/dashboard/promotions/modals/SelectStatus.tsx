import React from 'react';
import {Box, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';

interface SelectStatusProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (status: string) => void;
  selectedStatus?: string;
}

const statusOptions = [
  {id: 'all', title: 'All'},
  {id: 'active', title: 'Active'},
  {id: 'ongoing', title: 'Ongoing'},
  {id: 'completed', title: 'Completed'},
  {id: 'pending', title: 'Pending'},
];

export const SelectStatus = ({
  isVisible,
  onClose,
  onSelect,
  selectedStatus,
}: SelectStatusProps) => {
  const handleSelect = (status: string) => {
    onSelect(status);
    onClose();
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="Select Status" onClose={onClose} />

        <Box mt={hp(20)} mx={wp(16)}>
          {statusOptions.map((item, index) => {
            const isSelected = selectedStatus === item.title;
            return (
              <Box
                key={item.id}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => handleSelect(item.title)}
                height={hp(56)}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                borderBottomWidth={index < statusOptions.length - 1 ? 1 : 0}
                borderBottomColor={theme.colors.BASE_SECONDARY}>
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
