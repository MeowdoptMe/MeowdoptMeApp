import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SheltersScreen from './SheltersScreen';
import PreferencesScreen from './PreferencesScreen';
import {ShelterContext} from './Context';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const [shelter, setShelter] = React.useState<string | undefined>(undefined);
  return (
    <ShelterContext.Provider value={{shelter, setShelter}}>
      <NavigationContainer>
        <Tab.Navigator
          backBehavior="none"
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
    </ShelterContext.Provider>
  );
}

export default MainScreen;
