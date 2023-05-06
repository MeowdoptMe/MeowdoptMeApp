import * as React from 'react';
import {useState} from 'react';
// import {StyleSheet} from 'react-native';
import StartingScreen from './src/StartingScreen';
import {AppContext, User} from './src/Context';
import {Screen} from './src/Screen';

const guestUser: User = {
  username: 'guest',
  mail: 'guest',
  token: 'guest',
};

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
      {isStartingScreen ? <StartingScreen /> : <Screen />}
    </AppContext.Provider>
  );
}

export default App;
