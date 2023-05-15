import React from 'react';
import 'react-native';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import axios from 'axios';

import authUtils from '../src/authUtils';
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

    expect(screen.getByText(/Ready to browse\?/)).toBeOnTheScreen();
  });

  it("goes to MainScreen when 'Skip' button is pressed", () => {
    render(<App />);
    act(() => {
      fireEvent(screen.getByText(/Skip/), 'onPressOut');
    });

    expect(screen.getByText(/Home/)).toBeOnTheScreen();
  });

  describe('Login modal', () => {
    it("appears when 'Login' button is pressed", () => {
      render(<App />);
      act(() => {
        fireEvent(screen.getByText(/Login/), 'onPressOut');
      });

      expect(screen.getByText(/Login!/)).toBeOnTheScreen();
    });

    it("doesn't call 'authUtils.login' when 'Login' button is pressed with incorrect data", async () => {
      const spy = jest.spyOn(authUtils, 'login');

      render(<App />);
      act(() => fireEvent(screen.getByText(/Login/), 'onPressOut'));
      await act(() => fireEvent(screen.getByText(/Login!/), 'onPressOut'));

      expect(authUtils.login).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("shows error message when 'Login' button is pressed with incorrect data", async () => {
      render(<App />);
      act(() => fireEvent(screen.getByText(/Login/), 'onPressOut'));
      await act(() => fireEvent(screen.getByText(/Login!/), 'onPressOut'));

      expect(
        screen.getByText(/Woof! Please fill in all fields/),
      ).toBeOnTheScreen();
    });

    it("calls 'authUtils.login' when 'Login' button is pressed with correct data", async () => {
      const spy = jest.spyOn(authUtils, 'login');

      render(<App />);
      act(() => fireEvent(screen.getByText(/Login/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login\/email/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/password/),
          'changeText',
          'jest-test-password',
        );
      });
      await act(() => fireEvent(screen.getByText(/Login!/), 'onPressOut'));

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
      act(() => fireEvent(screen.getByText(/Login/), 'onPressOut'));
      act(() => {
        fireEvent.changeText(
          screen.getByPlaceholderText(/login\/email/),
          'jest-test-login',
        );
        fireEvent.changeText(
          screen.getByPlaceholderText(/password/),
          'jest-test-password',
        );
      });
      await act(() => fireEvent(screen.getByText(/Login!/), 'onPressOut'));

      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText(/Home/)).toBeOnTheScreen();

      spy.mockRestore();
    });

    it('shows error message after unsuccessful login', async () => {
      const spy = jest.spyOn(axios, 'post');
      spy.mockImplementationOnce(() => {
        return Promise.reject('jest-mock-error');
      });

      render(<App />);
      act(() => fireEvent(screen.getByText(/Login/), 'onPressOut'));
      act(() => {
        fireEvent.changeText(
          screen.getByPlaceholderText(/login\/email/),
          'jest-test-login',
        );
        fireEvent.changeText(
          screen.getByPlaceholderText(/password/),
          'jest-test-password',
        );
      });
      await act(async () =>
        fireEvent(screen.getByText(/Login!/), 'onPressOut'),
      );

      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText(/jest-mock-error/)).toBeOnTheScreen();

      spy.mockRestore();
    });
  });

  describe('Registration modal', () => {
    it("appears when 'Register' button is pressed", () => {
      render(<App />);
      act(() => {
        fireEvent(screen.getByText(/Register/), 'onPressOut');
      });
      expect(screen.getByText(/Register!/)).toBeOnTheScreen();
    });

    it("doesn't call 'authUtils.register' when 'Register' button is pressed with incorrect data", async () => {
      const spy = jest.spyOn(authUtils, 'register');

      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      await act(() => fireEvent(screen.getByText(/Register!/), 'onPressOut'));

      expect(authUtils.register).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("shows error message when 'Register' button is pressed with incorrect data", async () => {
      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      await act(() => fireEvent(screen.getByText(/Register!/), 'onPressOut'));

      expect(
        screen.getByText(/Woof! Please fill in all fields/),
      ).toBeOnTheScreen();
    });

    it('detects password mismatch', async () => {
      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/email/),
          'changeText',
          'jest-test-email',
        );
        fireEvent(
          screen.getByPlaceholderText(/^password/),
          'changeText',
          'jest-test-password',
        );
        fireEvent(
          screen.getByPlaceholderText(/repeat password/),
          'changeText',
          'jest-test-password-2',
        );
      });

      expect(screen.getByText(/Woof! Passwords don't match/)).toBeOnTheScreen();
    });

    it("doesn't call 'authUtils.register' when passwords don't match", async () => {
      const spy = jest.spyOn(authUtils, 'register');

      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/email/),
          'changeText',
          'jest-test-email',
        );
        fireEvent(
          screen.getByPlaceholderText(/^password/),
          'changeText',
          'jest-test-password',
        );
        fireEvent(
          screen.getByPlaceholderText(/repeat password/),
          'changeText',
          'jest-test-password-2',
        );
      });
      await act(() => fireEvent(screen.getByText(/Register!/), 'onPressOut'));

      expect(authUtils.register).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("calls 'authUtils.register' when 'Register' button is pressed with correct data", async () => {
      const spy = jest.spyOn(authUtils, 'register');

      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/email/),
          'changeText',
          'jest-test-email',
        );
        fireEvent(
          screen.getByPlaceholderText(/^password/),
          'changeText',
          'jest-test-password',
        );
        fireEvent(
          screen.getByPlaceholderText(/repeat password/),
          'changeText',
          'jest-test-password',
        );
      });
      await act(async () =>
        fireEvent(screen.getByText(/Register!/), 'onPressOut'),
      );

      expect(authUtils.register).toHaveBeenCalled();

      spy.mockRestore();
    });

    it("calls 'authUtils.login' after successful registration", async () => {
      const spy = jest.spyOn(axios, 'post');
      spy.mockImplementationOnce(() => {
        return Promise.resolve({status: 201});
      });
      const superSpy = jest.spyOn(authUtils, 'login');

      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/email/),
          'changeText',
          'jest-test-email',
        );
        fireEvent(
          screen.getByPlaceholderText(/^password/),
          'changeText',
          'jest-test-password',
        );
        fireEvent(
          screen.getByPlaceholderText(/repeat password/),
          'changeText',
          'jest-test-password',
        );
      });
      await act(async () =>
        fireEvent(screen.getByText(/Register!/), 'onPressOut'),
      );

      expect(authUtils.login).toHaveBeenCalled();

      spy.mockRestore();
      superSpy.mockRestore();
    });

    it("shows error message when 'authUtils.register' fails", async () => {
      const spy = jest.spyOn(axios, 'post');
      spy.mockImplementationOnce(() => {
        return Promise.reject({message: 'jest-mock-error'});
      });

      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/email/),
          'changeText',
          'jest-test-email',
        );
        fireEvent(
          screen.getByPlaceholderText(/^password/),
          'changeText',
          'jest-test-password',
        );
        fireEvent(
          screen.getByPlaceholderText(/repeat password/),
          'changeText',
          'jest-test-password',
        );
      });
      await act(async () =>
        fireEvent(screen.getByText(/Register!/), 'onPressOut'),
      );

      expect(screen.getByText(/jest-mock-error/)).toBeOnTheScreen();

      spy.mockRestore();
    });

    it("shows error message when 'authUtils.login' fails", async () => {
      const spy = jest.spyOn(axios, 'post');
      let registerCalled = false;
      spy.mockImplementation(() => {
        if (!registerCalled) {
          registerCalled = true;
          return Promise.resolve({status: 201});
        }
        return Promise.reject('jest-mock-error');
      });

      render(<App />);
      act(() => fireEvent(screen.getByText(/Register/), 'onPressOut'));
      act(() => {
        fireEvent(
          screen.getByPlaceholderText(/login/),
          'changeText',
          'jest-test-login',
        );
        fireEvent(
          screen.getByPlaceholderText(/email/),
          'changeText',
          'jest-test-email',
        );
        fireEvent(
          screen.getByPlaceholderText(/^password/),
          'changeText',
          'jest-test-password',
        );
        fireEvent(
          screen.getByPlaceholderText(/repeat password/),
          'changeText',
          'jest-test-password',
        );
      });
      await act(async () =>
        fireEvent(screen.getByText(/Register!/), 'onPressOut'),
      );

      expect(screen.getByText(/jest-mock-error/)).toBeOnTheScreen();

      spy.mockRestore();
    });
  });
});
