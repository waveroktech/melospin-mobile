import React, {useEffect, useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {BaseModal, Icon, Loader, ModalHeader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {useGetDjs} from 'store';
import {EmptyPromotionContainer} from '../components';

interface SelectDjsProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (selectedDjs: any[]) => void;
  activePromoters?: any[];
}

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

export const SelectDjs = ({
  isVisible,
  onClose,
  onComplete,
  activePromoters,
}: SelectDjsProps) => {
  const [selectedDjs, setSelectedDjs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {data, isPending, refetch} = useGetDjs();

  console.log(data, 'data');

  useEffect(() => {
    if (isVisible) {
      setSelectedDjs(activePromoters || []);
      setSearchQuery(''); // Reset search when modal opens
    }
  }, [activePromoters, isVisible]);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  // Filter DJs based on search query
  const filteredDjs =
    data?.data?.filter((dj: any) => {
      if (!searchQuery.trim()) {
        return true;
      }

      const query = searchQuery.toLowerCase().trim();
      const djName = dj?.name?.toLowerCase() || '';

      return djName.includes(query);
    }) || [];

  const onSelectDj = async (selectedDj: any) => {
    const checkExisting = selectedDjs?.find(
      d => d?.userId === selectedDj?.userId,
    );

    if (checkExisting === undefined) {
      const payload = [...selectedDjs, selectedDj];
      setSelectedDjs(payload);
      console.log('we are here');
    } else if (checkExisting?.name) {
      const removeExisting = selectedDjs?.filter(
        d => d?.userId !== selectedDj?.userId,
      );
      setSelectedDjs(removeExisting);
    }
    forceUpdate();
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          modalHeaderText="Select DJs to add"
        />

        <Box mt={hp(20)} style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search DJ"
            selectionColor={theme.colors.WHITE}
            placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Box>
        <Box height={'100%'}>
          <FlatList
            extraData={selectedDjs}
            data={filteredDjs}
            renderItem={({item, index}: any) => (
              <Box
                key={index}
                borderBottomWidth={1}
                p={hp(20)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => onSelectDj(item)}
                flexDirection={'row'}
                alignItems={'center'}
                mb={hp(14)}
                borderBottomColor={theme.colors.BASE_SECONDARY}
                mx={wp(16)}>
                {selectedDjs?.includes(item) && (
                  <Box mr={wp(10)}>
                    <Icon name="selected-dj" />
                  </Box>
                )}
                <Image
                  source={
                    item?.profileUrl
                      ? {uri: item?.profileUrl}
                      : theme.images['dj-images']['dj-1']
                  }
                  style={styles.profileImage}
                  resizeMode="contain"
                />
                <Box ml={wp(10)}>
                  <Box flexDirection={'row'} alignItems={'center'}>
                    <Box flexDirection={'row'} alignItems={'center'}>
                      <Text
                        pr={2}
                        variant="bodyBold"
                        fontSize={fontSz(14)}
                        color={theme.colors.WHITE}>
                        {item?.name}
                      </Text>
                      <Icon name="verified" />
                    </Box>

                    {item?.connected && (
                      <Box
                        flexDirection={'row'}
                        alignItems={'center'}
                        ml={wp(20)}>
                        <Box
                          width={6}
                          height={6}
                          borderRadius={100}
                          bg={theme.colors.TEXT_INPUT_PLACEHOLDER}
                        />
                        <Text
                          pl={2}
                          variant="bodyMedium"
                          fontSize={fontSz(14)}
                          color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                          Connected
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
            ListFooterComponent={<Box pb={hp(200)} />}
            ListEmptyComponent={
              <EmptyPromotionContainer
                icon="empty-folder"
                containerStyles={{my: hp(40)}}
                title="No DJs Found"
                subTitle="You can view all available DJs here"
              />
            }
          />
        </Box>
      </Box>
      <Button
        hasBorder
        onPress={() => onComplete(selectedDjs)}
        disabled={selectedDjs?.length > 0 ? false : true}
        bottom={10}
        alignSelf={'center'}
        position={'absolute'}
        bg={theme.colors.PRIMARY_100}
        title="Add to promo list"
      />
      <Loader loading={isPending} />
    </BaseModal>
  );
};
