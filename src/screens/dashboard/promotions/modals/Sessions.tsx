import {sessions} from 'data';
import {Box, Button, Text} from 'design-system';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {queryClient} from 'services/api';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {useMelospinStore, useUpdateUserPlaySessions} from 'store';
import theme from 'theme';
import {hp, wp} from 'utils';

interface SessionsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Sessions = ({isVisible, onClose}: SessionsProps) => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const {userInfo} = useMelospinStore();

  const {mutate: updateUserPlaySessions, isPending} = useUpdateUserPlaySessions(
    {
      onSuccess: (data: any) => {
        if (data?.status === 'success') {
          queryClient.invalidateQueries({queryKey: ['get-user-profile']});
          onClose();
          showMessage({
            message: 'Play sessions saved successfully',
            type: 'success',
          });
        }
        if (data?.status === 'failed') {
          showMessage({
            message: 'Play sessions not saved',
            type: 'danger',
          });
        }
      },
    },
  );

  useEffect(() => {
    setSelectedSessions(userInfo?.playingDays);
  }, [userInfo?.playingDays]);

  const handleSave = () => {
    updateUserPlaySessions({
      userId: userInfo?.userId,
      data: {
        playingDays: selectedSessions?.map(session => session?.toLowerCase()),
      },
    });
  };

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
                          session?.title?.toLowerCase(),
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
                        selectedSessions?.includes(
                          session?.title?.toLowerCase(),
                        )
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
          disabled={selectedSessions?.length === 0}
          onPress={handleSave}
          isLoading={isPending}
          my={hp(20)}
        />
      </Box>
    </BaseModal>
  );
};
