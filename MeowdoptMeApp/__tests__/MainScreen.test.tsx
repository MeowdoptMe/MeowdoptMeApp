import React from 'react';
import 'react-native';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import {AppContext, guestUser} from '../src/Context';
import MainScreen from '../src/MainScreen';

jest.useFakeTimers();

jest.mock('react-native-webview', () => {
  return {
    WebView: jest.fn(),
  };
});

const guestTestContext = {
  user: guestUser,
  setUser: jest.fn(),
  setIsStartingScreen: jest.fn(),
};

describe('MainScreen', () => {
  it('renders', () => {
    render(
      <AppContext.Provider value={guestTestContext}>
        <MainScreen />
      </AppContext.Provider>,
    );
  });
});
