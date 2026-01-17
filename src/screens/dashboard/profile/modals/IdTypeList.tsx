import React from 'react';
import {Box, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import {idTypeList} from 'data';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';

interface IdTypeListProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (value: {id: number; title: string; value: string}) => void;
}

export const IdTypeList = ({
  isVisible,
  onClose,
  onComplete,
}: IdTypeListProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="ID Type" onClose={onClose} />

        <Box mt={hp(20)} mx={wp(16)}>
          {idTypeList?.map((item, index) => {
            return (
              <Box
                key={index}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => onComplete(item)}
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
