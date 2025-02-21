import React from 'react';
import {Box, Button} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp} from 'utils';
import theme from 'theme';
import {TextInput} from 'react-native';
import {styles} from './style';
import {djs} from 'data';
import {SelectDjItem} from '../components';
import {FlashList} from '@shopify/flash-list';

interface SelectDjsProps {
  isVisible: boolean;
  onClose: () => void;
}
export const SelectDjs = ({isVisible, onClose}: SelectDjsProps) => {
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
            ListFooterComponent={<Box pb={hp(240)} />}
            //@ts-ignore
            contentContainerStyle={styles.contentContainerStyle}
            data={djs}
            renderItem={({item}) => <SelectDjItem item={item} />}
          />
        </Box>
      </Box>
      <Button
        hasBorder
        onPress={onClose}
        bottom={10}
        alignSelf={'center'}
        position={'absolute'}
        bg={theme.colors.PRIMARY_100}
        title="Add to promo list"
      />
    </BaseModal>
  );
};
