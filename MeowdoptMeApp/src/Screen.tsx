import * as React from 'react';
// import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SheltersScreen from './SheltersScreen';
import PreferencesScreen from './PreferencesScreen';

const Tab = createBottomTabNavigator();

function Screen() {
  return (
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

export {Screen};
