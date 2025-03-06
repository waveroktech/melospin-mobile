import React, {useEffect, useState} from 'react';
import {Box, Button} from 'design-system';
import {BaseModal, Icon, Loader, ModalHeader} from 'shared';
import {hp} from 'utils';
import theme from 'theme';
import {TextInput} from 'react-native';
import {styles} from './style';
import {SelectDjItem} from '../components';
import {useGetDjs} from 'store';
import {FlashList} from '@shopify/flash-list';

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
  const {data, isPending, refetch} = useGetDjs();

  useEffect(() => {
    if (isVisible) {
      setSelectedDjs(activePromoters || []);
    }
  }, [activePromoters, isVisible]);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  const onSelectDj = async (selectedDj: any) => {
    const checkExisting = selectedDjs?.find(
      d => d?.userId === selectedDj?.userId,
    );

    console.log(!checkExisting, 'selectedDj');

    if (checkExisting === undefined) {
      setSelectedDjs([...selectedDjs, selectedDj]);
      forceUpdate();
      console.log('we are here');
    }

    // if (checkExisting?.userId) {
    //   const removeExisting = selectedDjs?.filter(
    //     d => d?.userId !== selectedDj?.userId,
    //   );
    //   setSelectedDjs(removeExisting);
    // } else {
    //   setSelectedDjs([...selectedDjs, selectedDj]);
    // }
  };

  console.log(selectedDjs, 'selectedDjs');

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
          />
        </Box>
        <Box height={'100%'}>
          <FlashList
            estimatedItemSize={200}
            data={data?.data}
            renderItem={({item}) => (
              <SelectDjItem
                onPress={() => onSelectDj(item)}
                selectedDjs={selectedDjs}
                item={item}
              />
            )}
            ListFooterComponent={<Box pb={hp(200)} />}
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
