import React from 'react';
import {ScrollView} from 'react-native';
import {Box} from 'design-system';
import {hp} from 'utils';
import {styles} from '../style';
import {BookingHistory, DjEarnings, DjSettings, PromotionButton} from './index';
import {promotionTabs} from 'data';

interface DjPromotionsViewProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const DjPromotionsView = ({
  activeIndex,
  setActiveIndex,
}: DjPromotionsViewProps) => {
  return (
    <Box mt={hp(20)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        {promotionTabs?.map((tab, index) => {
          return (
            <PromotionButton
              key={index}
              tab={tab}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          );
        })}
      </ScrollView>

      {activeIndex === 1 && <DjEarnings setActiveIndex={setActiveIndex} />}
      {activeIndex === 2 && <BookingHistory />}
      {activeIndex === 3 && <DjSettings />}
    </Box>
  );
};
