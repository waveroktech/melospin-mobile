import {Box, Text} from 'design-system';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {BaseModal, Icon, ModalHeader} from 'shared';
import theme from 'theme';
import {hp, wp} from 'utils';

interface SelectTimelineProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (timeline: string) => void;
  selectedTimeline?: string;
}

const timelineFilterOptions = [
  {id: '1-month', title: '1 Month'},
  {id: '2-months', title: '2 Months'},
  {id: '3-months', title: '3 Months'},
  {id: '4-months', title: '4 Months'},
  {id: '5-months', title: '5 Months'},
  {id: '6-months', title: '6 Months'},
  {id: '7-months', title: '7 Months'},
  {id: '8-months', title: '8 Months'},
  {id: '9-months', title: '9 Months'},
  {id: '10-months', title: '10 Months'},
  {id: '11-months', title: '11 Months'},
  {id: '12-months', title: '12 Months'},
];

export const SelectTimeline = ({
  isVisible,
  onClose,
  onComplete,
  selectedTimeline,
}: SelectTimelineProps) => {
  const handleSelect = (timeline: string) => {
    onComplete(timeline);
    onClose();
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(24)}>
        <ModalHeader modalHeaderText="Select Timeline" onClose={onClose} />

        <ScrollView
          style={{maxHeight: hp(500)}}
          contentContainerStyle={{paddingBottom: hp(20)}}>
          <Box mt={hp(20)} mx={wp(16)}>
            {timelineFilterOptions.map((item, index) => {
              const isSelected = selectedTimeline === item.title;
              return (
                <Box
                  key={item.id}
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => handleSelect(item.title)}
                  height={hp(56)}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  borderBottomWidth={
                    index < timelineFilterOptions.length - 1 ? 1 : 0
                  }
                  borderBottomColor={theme.colors.BASE_SECONDARY}>
                  <Text
                    variant="body"
                    fontFamily={
                      isSelected
                        ? theme.font.AvenirNextSemiBold
                        : theme.font.AvenirNextRegular
                    }
                    color={
                      isSelected ? theme.colors.LIGHT_PRIMARY : theme.colors.WHITE
                    }>
                    {item.title}
                  </Text>
                  {isSelected && <Icon name="active-checkbox" />}
                </Box>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
    </BaseModal>
  );
};
