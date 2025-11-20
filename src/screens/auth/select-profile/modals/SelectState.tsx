import React, {useState, useMemo, useCallback, useRef} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {FlatList, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {styles} from './style';
import {states} from 'data';

interface SelectStateProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectState: (state: any) => void;
}

export const SelectState = ({
  isVisible,
  onClose,
  onSelectState,
}: SelectStateProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  // Filter and sort states based on search query
  const filteredStates = useMemo(() => {
    const query = searchQuery.trim();

    let filtered = states;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = states.filter(state => {
        const stateName = state.state?.toLowerCase() || '';
        return stateName.includes(lowerQuery);
      });
    }

    // Sort alphabetically by state name
    return [...filtered].sort((a, b) => {
      const stateA = a.state?.toLowerCase() || '';
      const stateB = b.state?.toLowerCase() || '';
      return stateA.localeCompare(stateB);
    });
  }, [searchQuery]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Handle bank selection
  const handleStateSelection = useCallback(
    (state: any) => {
      Keyboard.dismiss();
      onSelectState(state);
      clearSearch(); // Clear search when bank is selected
    },
    [onSelectState, clearSearch],
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
          modalHeaderText="Select state"
        />

        <Box mt={hp(20)} style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            ref={searchInputRef}
            style={styles.searchTextInput}
            placeholder="Search state"
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

        <Box height={'100%'}>
          <FlatList
            extraData={filteredStates}
            data={filteredStates}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, index) => `${item.state}-${index}`}
            renderItem={({item, index}: any) => (
              <Box
                key={index}
                borderBottomWidth={1}
                p={hp(20)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => handleStateSelection(item)}
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
                        {item?.state}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            ListFooterComponent={<Box pb={hp(200)} />}
            ListEmptyComponent={
              <Box mx={wp(16)} mt={hp(40)}>
                <Text
                  variant="body"
                  fontSize={fontSz(14)}
                  color={theme.colors.WHITE}>
                  No states found
                </Text>
              </Box>
            }
          />
        </Box>
      </Box>
    </BaseModal>
  );
};
