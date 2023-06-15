import React from 'react';
import 'react-native';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import ShelterPage from '../src/ShelterPage/ShelterPage';

describe('ShelterPage', () => {
  it('renders', () => {
    render(<ShelterPage />);
  });
});
