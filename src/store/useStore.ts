import AsyncStorage from '@react-native-async-storage/async-storage';
import {StateCreator, create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface MelospinStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  authToken: string;
  setAuthToken: (authToken: string) => void;
  logoutUser: () => void;
  userData: any;
  setUserData: (userData: any) => void;
}

const melospinSlice: StateCreator<
  MelospinStore,
  [['zustand/persist', unknown]]
> = set => ({
  authToken: '',
  isLoggedIn: false,
  userData: {},

  setAuthToken: (authToken: string) => set({authToken: authToken}),
  setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn: isLoggedIn}),
  logoutUser: () => {
    set({authToken: '', isLoggedIn: false});
  },
  setUserData: (userData: any) => set({userData: userData}),
});

export const useMelospinStore = create<MelospinStore>()(
  persist(melospinSlice, {
    name: 'melospin-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
