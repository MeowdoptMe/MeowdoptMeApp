import * as React from 'react';
import {createContext, Context} from 'react';

interface User {
  username: string;
  mail: string;
  token: string;
  // permissions: PermissionsList;
  // requests: PermissionRequest[];
}

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsStartingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext: Context<AppContextType> = createContext<
  AppContextType | undefined
>(undefined) as Context<AppContextType>;

export {AppContext};
export type {User, AppContextType};
