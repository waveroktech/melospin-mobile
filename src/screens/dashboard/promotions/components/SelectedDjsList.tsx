import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';

interface SelectedDjsListProps {
  selectedDjs: any[];
  onRemoveDj: (dj: any) => void;
}

export const SelectedDjsList = ({
  selectedDjs,
  onRemoveDj,
}: SelectedDjsListProps) => {
  const [showSelectedDjs, setShowSelectedDjs] = useState(false);

  if (selectedDjs.length === 0) {
    return null;
  }

  return (
    <Box
      mt={hp(24)}
      mx={wp(16)}
      position={'absolute'}
      bottom={hp(100)}
      left={0}
      right={0}>
      <Box bg={theme.colors.BLACK_DEFAULT} p={hp(24)} borderRadius={hp(24)}>
        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          onPress={() => setShowSelectedDjs(!showSelectedDjs)}
          flexDirection={'row'}
          mb={showSelectedDjs ? hp(16) : 0}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Text variant="bodyMedium" color={theme.colors.WHITE}>
            ({selectedDjs.length}) DJs Added
          </Text>

          <Box>
            <Icon name={showSelectedDjs ? 'arrow-up-2' : 'arrow-down-2'} />
          </Box>
        </Box>

        {showSelectedDjs && (
          <Box mt={hp(16)}>
            {selectedDjs.map((dj: any, index: number) => (
              <Box
                key={dj?.userId || index}
                flexDirection={'row'}
                alignItems={'center'}
                pb={hp(16)}
                borderBottomWidth={index < selectedDjs.length - 1 ? 1 : 0}
                borderBottomColor={theme.colors.BASE_SECONDARY}
                mb={index < selectedDjs.length - 1 ? hp(16) : 0}>
                <Box
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => onRemoveDj(dj)}
                  width={wp(32)}
                  height={hp(24)}
                  borderRadius={hp(16)}
                  bg={theme.colors.WHITE}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Icon name="trash-3" />
                </Box>

                <Text
                  variant="bodyMedium"
                  pl={wp(12)}
                  color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                  {dj?.name}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
