import React, {useState, useMemo, useCallback, useRef} from 'react';
import {Box, Text} from 'design-system';
import {EmptyPromotionContainer} from '../components';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {FlatList, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {styles} from './style';
import {useMelospinStore} from 'store';

interface BankListProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectBank: (bank: any) => void;
}

// Helper function to highlight search terms
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <Text
          key={index}
          variant="bodyBold"
          fontSize={fontSz(14)}
          color={theme.colors.PRIMARY_100}>
          {part}
        </Text>
      );
    }
    return part;
  });
};

export const BankList = ({isVisible, onClose, onSelectBank}: BankListProps) => {
  const {bankList} = useMelospinStore();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  // Filter banks based on search query
  const filteredBanks = useMemo(() => {
    const query = searchQuery.trim();

    if (!query) {
      return bankList;
    }

    const lowerQuery = query.toLowerCase();
    return bankList.filter(bank => {
      const bankName = bank.name?.toLowerCase() || '';
      const bankCode = bank.bankCode?.toLowerCase() || '';

      // Search in both bank name and code
      return bankName.includes(lowerQuery) || bankCode.includes(lowerQuery);
    });
  }, [bankList, searchQuery]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Handle bank selection
  const handleBankSelection = useCallback(
    (bank: any) => {
      Keyboard.dismiss();
      onSelectBank(bank);
      clearSearch(); // Clear search when bank is selected
    },
    [onSelectBank, clearSearch],
  );

  // Reset search when modal opens/closes
  React.useEffect(() => {
    if (!isVisible) {
      setSearchQuery('');
    } else {
      // Add a small delay to prevent flicker when modal opens
      const timer = setTimeout(() => {
        if (searchInputRef.current && isVisible) {
          searchInputRef.current.focus();
        }
      }, 500); // Increased delay to ensure modal animation completes

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      onModalHide={() => setSearchQuery('')}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          modalHeaderText="Select bank"
        />

        <Box mt={hp(20)} style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            ref={searchInputRef}
            style={styles.searchTextInput}
            placeholder="Search bank by name or code"
            selectionColor={theme.colors.WHITE}
            placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            textContentType="none"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              activeOpacity={0.8}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{padding: 8}}>
              <Icon name="close-icon" />
            </TouchableOpacity>
          )}
        </Box>

        {searchQuery.length > 0 && (
          <Box mx={wp(16)} mt={hp(10)}>
            <Text
              variant="body"
              fontSize={fontSz(12)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              {filteredBanks.length} bank{filteredBanks.length !== 1 ? 's' : ''}{' '}
              found
            </Text>
          </Box>
        )}

        <Box height={'100%'}>
          <FlatList
            extraData={filteredBanks}
            data={filteredBanks}
            keyExtractor={(item, index) => `${item.bankCode}-${index}`}
            renderItem={({item, index}: any) => (
              <Box
                key={index}
                borderBottomWidth={1}
                p={hp(20)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => handleBankSelection(item)}
                flexDirection={'row'}
                alignItems={'center'}
                mb={hp(14)}
                borderBottomColor={theme.colors.BASE_SECONDARY}
                mx={wp(16)}>
                <Box ml={wp(10)}>
                  <Box flexDirection={'row'} alignItems={'center'}>
                    <Box flexDirection={'row'} alignItems={'center'}>
                      <Text
                        pr={2}
                        variant="bodyBold"
                        fontSize={fontSz(14)}
                        color={theme.colors.WHITE}>
                        {searchQuery.trim()
                          ? highlightText(item?.name || '', searchQuery.trim())
                          : item?.name}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            ListFooterComponent={<Box pb={hp(200)} />}
            ListEmptyComponent={
              <EmptyPromotionContainer
                icon="empty-folder"
                containerStyles={{my: hp(40)}}
                title={searchQuery ? 'No banks found' : 'No bank found'}
                subTitle={
                  searchQuery
                    ? `No banks match "${searchQuery}". Try a different search term.`
                    : 'You can view all available banks here'
                }
              />
            }
          />
        </Box>
      </Box>
    </BaseModal>
  );
};
