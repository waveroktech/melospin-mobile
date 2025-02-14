import AsyncStorage from '@react-native-async-storage/async-storage';
import {StateCreator, create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface MelospinStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const melospinSlice: StateCreator<
  MelospinStore,
  [['zustand/persist', unknown]]
> = set => ({
  isLoggedIn: false,

  setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn: isLoggedIn}),
});

export const useMelospinStore = create<MelospinStore>()(
  persist(melospinSlice, {
    name: 'melospin-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
