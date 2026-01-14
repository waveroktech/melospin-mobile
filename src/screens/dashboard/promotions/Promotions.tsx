import React, {useCallback, useEffect, useState} from 'react';
import {Loader, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import theme from 'theme';
import {ArtistePromotionHistory, DjPromotionsView} from './components';
import {useFocusEffect} from '@react-navigation/native';
import {useUserPromotions} from 'store/usePromotion';
import {useMelospinStore} from 'store';
import {
  OngoingPromotionDetails,
  PromotionDetails,
  PromotionHistory,
  SelectStatus,
  SelectTimeline,
} from './modals';

export const Promotions = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [open, setOpen] = useState<
    | 'promotion-details'
    | 'ongoing-promotion-details'
    | 'promotion-history'
    | 'status'
    | 'timeline'
    | ''
  >('');
  const [currentPromotion, setCurrentPromotion] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Today');

  useFocusEffect(
    useCallback(() => {
      setActiveIndex(1);
    }, [setActiveIndex]),
  );

  const {data, refetch, isPending} = useUserPromotions();
  const {userType} = useMelospinStore();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <DashboardHeader title="Promotions" />
      {userType === 'artiste' ? (
        <ArtistePromotionHistory
          promotions={data?.data}
          selectedStatus={selectedStatus}
          selectedTimeline={selectedTimeline}
          onStatusPress={() => setOpen('status')}
          onTimelinePress={() => setOpen('timeline')}
          onPromotionPress={item => {
            setCurrentPromotion(item);
            setOpen('promotion-history');
          }}
        />
      ) : userType === 'dj' ? (
        <DjPromotionsView
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ) : null}

      <Loader loading={isPending} />

      <PromotionDetails
        isVisible={open === 'promotion-details'}
        onClose={() => setOpen('')}
        onAccept={() => {
          setOpen('');
        }}
      />
      <OngoingPromotionDetails
        isVisible={open === 'ongoing-promotion-details'}
        onClose={() => setOpen('')}
      />

      <PromotionHistory
        isVisible={open === 'promotion-history'}
        onClose={() => setOpen('')}
        promotion={currentPromotion}
      />

      <SelectStatus
        isVisible={open === 'status'}
        onClose={() => setOpen('')}
        onSelect={setSelectedStatus}
        selectedStatus={selectedStatus}
      />

      <SelectTimeline
        isVisible={open === 'timeline'}
        onClose={() => setOpen('')}
        onComplete={setSelectedTimeline}
        selectedTimeline={selectedTimeline}
      />
    </Screen>
  );
};
