import React from 'react';
import 'react-native';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import axios from 'axios';

import * as authUtils from '../src/authUtils';
import App from '../App';

jest.mock('react-native-webview', () => {
  return {
    WebView: jest.fn(),
  };
});

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');
  return {
    ...originalModule,
    post: jest.fn(),
  };
});

describe('StartingScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('is the current screen at launch', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('login/email')).toBeOnTheScreen();
  });

  it("goes to MainScreen when 'Skip' button is pressed", () => {
    render(<App />);
    act(() => {
      fireEvent(screen.getByText('Skip'), 'onPressOut');
    });

    expect(screen.getByText('Home')).toBeOnTheScreen();
  });

  it("doesn't call 'login' when 'Login' button is pressed with incorrect data", async () => {
    const spy = jest.spyOn(authUtils, 'login');

    render(<App />);
    await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

    expect(authUtils.login).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it("shows error message when 'Login' button is pressed with incorrect data", async () => {
    render(<App />);
    await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

    expect(screen.getByText('Please fill in all fields')).toBeOnTheScreen();
  });

  it("calls 'login' when 'Login' button is pressed with correct data", async () => {
    const spy = jest.spyOn(authUtils, 'login');

    render(<App />);
    act(() => {
      fireEvent(
        screen.getByPlaceholderText('login/email'),
        'changeText',
        'jest-test-login',
      );
      fireEvent(
        screen.getByPlaceholderText('password'),
        'changeText',
        'jest-test-password',
      );
    });
    await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

    expect(authUtils.login).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('forwards to App after successful login', async () => {
    const spy = jest.spyOn(axios, 'post');
    spy.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          access: 'jest-mock-token',
        },
      });
    });

    render(<App />);
    act(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText('login/email'),
        'jest-test-login',
      );
      fireEvent.changeText(
        screen.getByPlaceholderText('password'),
        'jest-test-password',
      );
    });
    await act(() => fireEvent(screen.getByText('Login'), 'onPressOut'));

    expect(axios.post).toHaveBeenCalled();
    expect(screen.getByText('Home')).toBeOnTheScreen();

    spy.mockRestore();
  });

  it('shows error message after unsuccessful login', async () => {
    const spy = jest.spyOn(axios, 'post');
    spy.mockImplementationOnce(() => {
      return Promise.reject('jest-mock-error');
    });

    render(<App />);
    act(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText('login/email'),
        'jest-test-login',
      );
      fireEvent.changeText(
        screen.getByPlaceholderText('password'),
        'jest-test-password',
      );
    });
    await act(async () => fireEvent(screen.getByText('Login'), 'onPressOut'));

    expect(axios.post).toHaveBeenCalled();
    expect(screen.getByText('jest-mock-error')).toBeOnTheScreen();

    spy.mockRestore();
  });

  it("forwards to Registration when 'Register' is pressed", () => {
    render(<App />);
    act(() => fireEvent(screen.getByText('Register'), 'onPressOut'));

    expect(screen.getByText('Register!')).toBeOnTheScreen();
  });

  // TODO: this test has to be extended
  it("leaves StartingScreen when 'Register' is pressed", () => {
    render(<App />);
    act(() => fireEvent(screen.getByText('Register'), 'onPressOut'));
    act(() => fireEvent(screen.getByText('Register!'), 'onPressOut'));

    expect(screen.getByText('Home')).toBeOnTheScreen();
  });
});
