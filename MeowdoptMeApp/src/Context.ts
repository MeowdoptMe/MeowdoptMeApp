import React from 'react';
import {createContext, Context} from 'react';
import {Ad} from './commonTypes';

interface User {
  username: string;
  mail: string;
  token: string;
  // permissions: PermissionsList;
  // requests: PermissionRequest[];
}

const guestUser: User = {
  username: 'Guest',
  mail: '__guest-mail__',
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
  shelter: string | undefined;
  setShelter: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ShelterContext: Context<ShelterContextType> = createContext<
  ShelterContextType | undefined
>(undefined) as Context<ShelterContextType>;

interface AdListContextType {
  changeAd: (ad: Ad, index: number) => void;
}

const AdListContext = createContext<AdListContextType>(undefined as any);

interface AdContextType {
  ad: Ad;
  adIndex: number;
}

const AdContext = createContext<AdContextType>(undefined as any);

export {AppContext, guestUser, ShelterContext, AdListContext, AdContext};
