import React, {useEffect} from 'react';
import {Box, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {TextInput} from 'react-native';
import {styles} from './style';
import theme from 'theme';
import {FlashList} from '@shopify/flash-list';
import {DiscographyItem} from 'screens/dashboard/discography/component';
import {useGetDiscography} from 'store';
import {EmptyPromotionContainer} from '../components';

interface SelectDiscographyProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAudio: (audioFile: any) => void;
}

export const SelectDiscography = ({
  isVisible,
  onClose,
  onSelectAudio,
}: SelectDiscographyProps) => {
  const {data, refetch} = useGetDiscography();

  useEffect(() => {
    refetch();
  }, [isVisible, refetch]);
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          modalHeaderText="Choose file"
        />
        <Text
          pt={hp(20)}
          px={wp(16)}
          variant="body"
          fontSize={fontSz(16)}
          color={theme.colors.WHITE}>
          Click to select an audio file to promote
        </Text>
        <Box mt={hp(20)} style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search DJ"
            selectionColor={theme.colors.WHITE}
            placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
          />
        </Box>

        <Box height={'100%'} mt={hp(20)}>
          <FlashList
            estimatedItemSize={200}
            ListFooterComponent={<Box pb={hp(240)} />}
            data={data?.data}
            renderItem={({item}) => (
              <DiscographyItem
                isPressable
                onPress={() => onSelectAudio(item)}
                //@ts-ignore
                item={item}
              />
            )}
            ListEmptyComponent={
              <EmptyPromotionContainer
                icon="empty-folder"
                containerStyles={{my: hp(100)}}
                title="No Files uploaded yet"
                subTitle="You can view all files history as soon as they are made."
              />
            }
          />
        </Box>
      </Box>
    </BaseModal>
  );
};
