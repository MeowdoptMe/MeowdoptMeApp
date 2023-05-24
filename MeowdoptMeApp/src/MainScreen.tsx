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
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          keyboardHidesNavigationBar={true}
          barStyle={{
            backgroundColor: colorPalette.strongAccentColor,
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              if (route.name === 'SheltersScreen') {
                return (
                  <Ionicons
                    name={focused ? 'home' : 'home-outline'}
                    size={25}
                    color={focused ? '#000' : '#fff'}
                  />
                );
              }
              if (route.name === 'HomeScreen') {
                return (
                  <Ionicons
                    name={focused ? 'paw' : 'paw-outline'}
                    size={25}
                    color={focused ? '#000' : '#fff'}
                  />
                );
              }
              if (route.name === 'PreferencesScreen') {
                return (
                  <Ionicons
                    name={focused ? 'settings' : 'settings-outline'}
                    size={25}
                    color={focused ? '#000' : '#fff'}
                  />
                );
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
    </ShelterContext.Provider>
  );
}

export default MainScreen;
