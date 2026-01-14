/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {Box, Text} from 'design-system';
import {BaseModal, FlashMessageToast, Loader, ModalHeader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {useSetHandleConnection} from 'store';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {EmptyPromotionContainer} from 'screens/dashboard/promotions/components';

interface ConnectionRequestsProps {
  isVisible: boolean;
  onClose: () => void;
  connectionRequests?: any[];
  onComplete: () => void;
  onModalHide?: () => void;
}

export const ConnectionRequests = ({
  isVisible,
  onClose,
  onComplete,
  connectionRequests,
  onModalHide,
}: ConnectionRequestsProps) => {
  const flashMessageRef = useRef<FlashMessage>(null);
  const queryClient = useQueryClient();

  const {mutate, isPending} = useSetHandleConnection({
    onSuccess: (data: any) => {
      console.log(data, 'data');
      if (data?.status === 'success') {
        // Invalidate queries to refetch updated data
        queryClient.invalidateQueries({
          queryKey: ['get-melospin-connections'],
        });
        queryClient.invalidateQueries({
          queryKey: ['get-melospin-connections-requests'],
        });
        onComplete();
        showMessage({
          type: 'success',
          message: 'Connection request accepted',
          duration: 2000,
        });
      } else if (data?.status === 'failed') {
        flashMessageRef.current?.showMessage({
          type: 'danger',
          message: data?.message,
          duration: 2000,
        });
      }
    },
  });

  const handleConnection = useCallback(
    (status: string, connectUserId: string) => {
      mutate({
        status,
        targetUserId: connectUserId,
      });
    },
    [mutate],
  );

  const connectionRequestsData = connectionRequests?.filter(
    (item: any) => item?.role === 'recipient',
  );

  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      onModalHide={onModalHide}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BLACK_DEFAULT,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          iconName="back-icon"
          modalHeaderText="Connection Requests"
          onClose={onClose}
        />

        <FlatList
          data={connectionRequestsData}
          renderItem={({item}) => (
            <Box
              mt={hp(10)}
              mx={wp(16)}
              borderBottomWidth={1}
              borderBottomColor={theme.colors.BASE_SECONDARY}
              flexDirection={'row'}
              p={hp(16)}>
              <Image
                source={theme.images['dj-images']['dj-2']}
                style={styles.imageProfile}
              />
              <Box ml={wp(10)}>
                <Box flexDirection={'row'}>
                  <Box flexDirection={'row'} alignItems={'center'}>
                    <Text
                      variant="bodyBold"
                      fontSize={fontSz(14)}
                      color={theme.colors.WHITE}>
                      {item.connectSenderInfo?.firstName}{' '}
                      {item?.connectSenderInfo?.lastName}
                    </Text>
                    <Box
                      width={10}
                      height={10}
                      style={{marginHorizontal: wp(8)}}
                      bg={theme.colors.OFF_WHITE_200}
                      borderRadius={100}
                    />

                    <Text
                      variant="bodyMedium"
                      fontSize={fontSz(14)}
                      width={wp(100)}
                      style={{textTransform: 'capitalize'}}
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      {item.connectSenderInfo?.currentUserType}
                    </Text>
                  </Box>
                </Box>
                <Box mt={hp(20)} flexDirection={'row'} alignItems={'center'}>
                  <Box
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleConnection('accept', item.connectionId)
                    }>
                    <GradientBorderView
                      gradientProps={{
                        colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
                      }}
                      style={styles.gradientContainer}>
                      <Text
                        variant="bodyMedium"
                        fontSize={fontSz(14)}
                        color={theme.colors.WHITE}>
                        Accept
                      </Text>
                    </GradientBorderView>
                  </Box>

                  <Box
                    width={wp(94)}
                    height={hp(37)}
                    ml={wp(20)}
                    as={TouchableOpacity}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleConnection('decline', item.connectionId)
                    }
                    justifyContent={'center'}
                    alignItems={'center'}
                    bg={theme.colors.BASE_SECONDARY}
                    borderRadius={hp(24)}>
                    <Text variant="bodyMedium" color={theme.colors.WHITE}>
                      Decline
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          ListEmptyComponent={
            <EmptyPromotionContainer
              containerStyles={{my: hp(220)}}
              icon="connection-count"
              title="No Connection Requests"
              subTitle="You can view all connection requests as soon as they are accepted"
            />
          }
        />
      </Box>

      <Loader loading={isPending} />

      <FlashMessageToast ref={flashMessageRef} />
    </BaseModal>
  );
};
