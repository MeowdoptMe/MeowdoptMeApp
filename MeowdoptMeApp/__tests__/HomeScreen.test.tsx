import React from 'react';
import 'react-native';
import {render, screen} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import {ShelterContext} from '../src/Context';
import {MainScreenNavigation} from '../src/MainScreen';

jest.mock('react-native-webview', () => {
  return {
    WebView: jest.fn(),
  };
});

describe('HomeScreen', () => {
  it('renders AdsPage by default', () => {
    render(
      <ShelterContext.Provider
        value={{
          shelter: undefined,
          setShelter: jest.fn(),
        }}>
        <MainScreenNavigation />
      </ShelterContext.Provider>,
    );

    expect(screen.getAllByText(/Home/).length).toBeGreaterThan(0);
  });

  it('renders ShelterPage when shelter is set', () => {
    render(
      <ShelterContext.Provider
        value={{
          shelter: 'defined',
          setShelter: jest.fn(),
        }}>
        <MainScreenNavigation />
      </ShelterContext.Provider>,
    );

    expect(screen.getByText(/ShelterPage/)).toBeOnTheScreen();
  });
});
