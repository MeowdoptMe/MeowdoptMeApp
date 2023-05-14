import React from 'react';
import 'react-native';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import AdsPage from '../src/AdsPage';

describe('AdsPage', () => {
  it('renders', () => {
    render(<AdsPage />);
  });
});
