import React from 'react';
import {createContext, Context} from 'react';
import {Ad, Shelter} from './commonTypes';
import type {User} from './commonTypes';

const guestUser: User = {
  username: 'Guest',
  mail: 'guest@guest.guest',
  token: '__guest-token__',
};

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsStartingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext: Context<AppContextType> = createContext<
  AppContextType | undefined
>(undefined) as Context<AppContextType>;

interface ShelterContextType {
  shelter: Shelter | undefined;
  setShelter: React.Dispatch<React.SetStateAction<Shelter | undefined>>;
}

const ShelterContext: Context<ShelterContextType> = createContext<
  ShelterContextType | undefined
>(undefined) as Context<ShelterContextType>;

interface AdListContextType {
  refreshAd: (adId: number) => Promise<void>;
}

const AdListContext = createContext<AdListContextType>(undefined as any);

interface AdContextType {
  ad: Ad;
  adIndex: number;
}

const AdContext = createContext<AdContextType>(undefined as any);

export {AppContext, guestUser, ShelterContext, AdListContext, AdContext};
