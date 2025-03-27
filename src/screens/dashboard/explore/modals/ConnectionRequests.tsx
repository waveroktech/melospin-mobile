import React from 'react';
import {Box} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import {hp} from 'utils';
import theme from 'theme';

interface ConnectionRequestsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ConnectionRequests = ({
  isVisible,
  onClose,
}: ConnectionRequestsProps) => {
  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BLACK_DEFAULT,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)}>
        <ModalHeader
          hasBackIcon
          iconName="back-icon"
          modalHeaderText="Connection Requests"
          onClose={onClose}
        />
      </Box>
    </BaseModal>
  );
};
