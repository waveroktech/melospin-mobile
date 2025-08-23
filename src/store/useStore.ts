import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponseData} from 'interfaces';
import {BankListResponse} from 'interfaces/services/user.interface';
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
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  bookingRate: number;
  setBookingRate: (bookingRate: number) => void;
  playSessions: string[];
  setPlaySessions: (playSessions: string[]) => void;

  bankInfo: {
    bankName: string;
    accountNumber: string;
    bankCode: string;
    accountName: string;
  };

  setBankInfo: (bankInfo: {
    bankName: string;
    accountNumber: string;
    bankCode: string;
    accountName: string;
  }) => void;

  bankList: BankListResponse[];
  setBankList: (bankList: BankListResponse[]) => void;
}

const melospinSlice: StateCreator<
  MelospinStore,
  [['zustand/persist', unknown]]
> = set => ({
  authToken: '',
  isLoggedIn: false,
  userData: undefined,
  userType: '',
  userInfo: undefined,
  bookingRate: 0,
  playSessions: [],
  bankInfo: {
    bankName: '',
    accountNumber: '',
    bankCode: '',
    accountName: '',
  },
  bankList: [],

  setAuthToken: (authToken: string) => set({authToken: authToken}),
  setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn: isLoggedIn}),
  logoutUser: () => {
    set({authToken: '', isLoggedIn: false});
  },
  setUserData: (userData: any) => set({userData: userData}),
  setUserType: (userType: 'dj' | 'artiste') => set({userType: userType}),
  setUserInfo: (userInfo: any) => set({userInfo: userInfo}),
  setBookingRate: (bookingRate: number) => set({bookingRate: bookingRate}),
  setPlaySessions: (playSessions: string[]) =>
    set({playSessions: playSessions}),
  setBankInfo: (bankInfo: {
    bankName: string;
    accountNumber: string;
    bankCode: string;
    accountName: string;
  }) => set({bankInfo: bankInfo}),
  setBankList: (bankList: any) => set({bankList: bankList}),
});

export const useMelospinStore = create<MelospinStore>()(
  persist(melospinSlice, {
    name: 'melospin-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
