import 'react-native';
import {render} from '@testing-library/react-native';
import React from 'react';

import '@testing-library/jest-native/extend-expect';

import App from '../App';

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
