import React from 'react';
import 'react-native';
import {render, screen} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import {ShelterContext} from '../src/Context';
import HomeScreen from '../src/HomeScreen';

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
        <HomeScreen />
      </ShelterContext.Provider>,
    );

    expect(screen.getAllByText(/Fifek/).length).toBeGreaterThan(0);
  });

  it('renders ShelterPage when shelter is set', () => {
    render(
      <ShelterContext.Provider
        value={{
          shelter: 'defined',
          setShelter: jest.fn(),
        }}>
        <HomeScreen />
      </ShelterContext.Provider>,
    );

    expect(screen.getByText(/ShelterPage/)).toBeOnTheScreen();
  });
});
