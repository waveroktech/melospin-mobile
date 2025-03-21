import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponseData} from 'interfaces';
import {StateCreator, create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface MelospinStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  authToken: string;
  setAuthToken: (authToken: string) => void;
  logoutUser: () => void;
  userData?: LoginResponseData;
  setUserData: (userData: any) => void;
  userType: 'dj' | 'artiste' | '';
  setUserType: (userType: 'dj' | 'artiste') => void;
}

const melospinSlice: StateCreator<
  MelospinStore,
  [['zustand/persist', unknown]]
> = set => ({
  authToken: '',
  isLoggedIn: false,
  userData: undefined,
  userType: '',

  setAuthToken: (authToken: string) => set({authToken: authToken}),
  setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn: isLoggedIn}),
  logoutUser: () => {
    set({authToken: '', isLoggedIn: false});
  },
  setUserData: (userData: any) => set({userData: userData}),
  setUserType: (userType: 'dj' | 'artiste') => set({userType: userType}),
});

export const useMelospinStore = create<MelospinStore>()(
  persist(melospinSlice, {
    name: 'melospin-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
