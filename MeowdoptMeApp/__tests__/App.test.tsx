import React from 'react';
import 'react-native';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import App from '../App';

jest.useFakeTimers();

jest.mock('react-native-webview', () => {
  return {
    WebView: jest.fn(),
  };
});

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });
});
