import {timeline} from 'data';
import {Box, Text} from 'design-system';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {BaseModal, Icon, ModalHeader} from 'shared';
import theme from 'theme';
import {hp, wp} from 'utils';

interface SelectTimelineProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (timeline: string) => void;
}

export const SelectTimeline = ({
  isVisible,
  onClose,
  onComplete,
}: SelectTimelineProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="Select Timeline" onClose={onClose} />

        <Box mt={hp(20)} mx={wp(16)}>
          {timeline?.map((item, index) => {
            return (
              <Box
                key={index}
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
