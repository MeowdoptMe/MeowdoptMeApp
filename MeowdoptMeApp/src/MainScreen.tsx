import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import SheltersScreen from './SheltersScreen';
import PreferencesScreen from './PreferencesScreen';
import {ShelterContext} from './Context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colorPalette from '../assets/colors';

const Tab = createMaterialBottomTabNavigator();

function MainScreen() {
  const [shelter, setShelter] = React.useState<string | undefined>(undefined);
  return (
    <ShelterContext.Provider value={{shelter, setShelter}}>
      <MainScreenNavigation />
    </ShelterContext.Provider>
  );
}

function MainScreenNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        backBehavior="none"
        initialRouteName="HomeScreen"
        keyboardHidesNavigationBar={true}
        barStyle={{
          backgroundColor: colorPalette.strongAccentColor,
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === 'SheltersScreen') {
              return tabBarIcon('home', focused);
            }
            if (route.name === 'HomeScreen') {
              return tabBarIcon('paw', focused);
            }
            if (route.name === 'PreferencesScreen') {
              return tabBarIcon('settings', focused);
            }
          },
        })}>
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

function tabBarIcon(name: string, focused: boolean) {
  return (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      size={25}
      color={focused ? '#000' : '#fff'}
    />
  );
}

export {MainScreenNavigation};
export default MainScreen;
