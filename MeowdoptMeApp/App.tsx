import React from 'react';
import {useState} from 'react';
import StartingScreen from './src/StartingScreen';
import {AppContext, guestUser} from './src/Context';
import type {User} from './src/commonTypes';
import MainScreen from './src/MainScreen';

function App() {
  const [isStartingScreen, setIsStartingScreen] = useState(true);
  const [user, setUser] = useState<User>(guestUser);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        setIsStartingScreen,
      }}>
      {isStartingScreen ? <StartingScreen /> : <MainScreen />}
    </AppContext.Provider>
  );
}

export default App;
