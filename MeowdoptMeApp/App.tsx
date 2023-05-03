import * as React from 'react';
import {useState} from 'react';
// import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StartingScreen from './src/StartingScreen';
import HomeScreen from './src/HomeScreen';
import SheltersScreen from './src/SheltersScreen';
import PreferencesScreen from './src/PreferencesScreen';
import {ScreenContext} from './src/Context';

const Tab = createBottomTabNavigator();

function App() {
  const [isStartingScreen, setIsStartingScreen] = useState(true);
  return isStartingScreen ? (
    <ScreenContext.Provider value={setIsStartingScreen}>
      <StartingScreen />
    </ScreenContext.Provider>
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="SheltersScreen"
          component={SheltersScreen}
          options={{title: 'Shelters'}}
        />
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Tab.Screen
          name="PreferencesScreen"
          component={PreferencesScreen}
          options={{title: 'Preferences'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
