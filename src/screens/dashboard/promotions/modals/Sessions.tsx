import {sessions} from 'data';
import {Box, Button, Text} from 'design-system';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {BaseModal, Icon, ModalHeader} from 'shared';
import theme from 'theme';
import {hp, wp} from 'utils';

interface SessionsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Sessions = ({isVisible, onClose}: SessionsProps) => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BASE_PRIMARY,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)}>
        <ModalHeader
          hasBackIcon
          iconName="back-icon"
          onClose={onClose}
          modalHeaderText="Play Sessions"
        />

        <Box mt={hp(20)} mx={wp(16)}>
          <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Confirm your playtime for promotions
          </Text>

          <Box
            p={hp(20)}
            bg={theme.colors.TEXT_INPUT_BG}
            my={hp(20)}
            borderRadius={hp(24)}>
            <Text variant="body" color={theme.colors.WHITE}>
              Select days of the week you play
            </Text>
            <Box
              mt={hp(10)}
              flexDirection={'row'}
              alignItems={'center'}
              flexWrap={'wrap'}>
              {sessions?.map(session => {
                return (
                  <Box
                    key={session.id}
                    flexDirection={'row'}
                    mr={wp(10)}
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (selectedSessions?.includes(session?.title)) {
                        setSelectedSessions(
                          selectedSessions?.filter(s => s !== session?.title),
                        );
                      } else {
                        setSelectedSessions([
                          ...selectedSessions,
                          session?.title,
                        ]);
                      }
                    }}
                    mb={hp(10)}
                    p={hp(1)}
                    borderRadius={hp(24)}
                    bg={theme.colors.BASE_SECONDARY}
                    alignItems={'center'}>
                    <Icon
                      name={
                        selectedSessions?.includes(session?.title)
                          ? 'active-checkbox'
                          : 'checkbox'
                      }
                    />
                    <Text px={wp(2)} variant="body" color={theme.colors.WHITE}>
                      {session.title}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Button
          title="Save"
          isNotBottom
          mx={wp(16)}
          hasBorder
          onPress={onClose}
          my={hp(20)}
        />
      </Box>
    </BaseModal>
  );
};
