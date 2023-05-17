import React from 'react';
import 'react-native';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import axios from 'axios';

import authUtils from '../src/authUtils';
import App from '../App';
import {open} from 'fs';

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
    function openLoginModal() {
      act(() => {
        fireEvent(screen.getByText(/Login/), 'onPressOut');
      });
    }

    async function attemptLogin() {
      await act(() => {
        fireEvent(screen.getByText(/Login!/), 'onPressOut');
      });
    }

    function provideLoginCredentials() {
      openLoginModal();
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
    }

    it("appears when 'Login' button is pressed", () => {
      render(<App />);
      openLoginModal();

      expect(screen.getByText(/Login!/)).toBeOnTheScreen();
    });

    it("doesn't call 'authUtils.login' when 'Login' button is pressed with incorrect data", async () => {
      const spy = jest.spyOn(authUtils, 'login');

      render(<App />);
      openLoginModal();
      await attemptLogin();

      expect(authUtils.login).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("shows error message when 'Login' button is pressed with incorrect data", async () => {
      render(<App />);
      openLoginModal();
      await attemptLogin();

      expect(
        screen.getByText(/Woof! Please fill in all fields/),
      ).toBeOnTheScreen();
    });

    it("calls 'authUtils.login' when 'Login' button is pressed with correct data", async () => {
      const spy = jest.spyOn(authUtils, 'login');

      render(<App />);
      provideLoginCredentials();
      await attemptLogin();

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
      provideLoginCredentials();
      await attemptLogin();

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
      provideLoginCredentials();
      await attemptLogin();

      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText(/jest-mock-error/)).toBeOnTheScreen();

      spy.mockRestore();
    });
  });

  describe('Registration modal', () => {
    function provideRegistrationCredentials(
      password = 'jest-test-password',
      confirmPassword = 'jest-test-password',
    ) {
      openRegistrationModal();
      act(() => {
        fireEvent.changeText(
          screen.getByPlaceholderText(/login/),
          'jest-test-login',
        );
        fireEvent.changeText(
          screen.getByPlaceholderText(/email/),
          'jest-test-email',
        );
        fireEvent.changeText(
          screen.getByPlaceholderText(/^password/),
          password,
        );
        fireEvent.changeText(
          screen.getByPlaceholderText(/repeat password/),
          confirmPassword,
        );
      });
    }

    function openRegistrationModal() {
      act(() => {
        fireEvent(screen.getByText(/Register/), 'onPressOut');
      });
    }

    async function attemptRegistration() {
      await act(() => {
        fireEvent(screen.getByText(/Register!/), 'onPressOut');
      });
    }

    it("appears when 'Register' button is pressed", () => {
      render(<App />);
      openRegistrationModal();
      expect(screen.getByText(/Register!/)).toBeOnTheScreen();
    });

    it("doesn't call 'authUtils.register' when 'Register' button is pressed with incorrect data", async () => {
      const spy = jest.spyOn(authUtils, 'register');

      render(<App />);
      openRegistrationModal();
      await attemptRegistration();

      expect(authUtils.register).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("shows error message when 'Register' button is pressed with incorrect data", async () => {
      render(<App />);
      openRegistrationModal();
      await attemptRegistration();

      expect(
        screen.getByText(/Woof! Please fill in all fields/),
      ).toBeOnTheScreen();
    });

    it('detects password mismatch', async () => {
      render(<App />);
      provideRegistrationCredentials(
        'jest-test-password',
        'jest-test-password-2',
      );

      expect(screen.getByText(/Woof! Passwords don't match/)).toBeOnTheScreen();
    });

    it("doesn't call 'authUtils.register' when passwords don't match", async () => {
      const spy = jest.spyOn(authUtils, 'register');

      render(<App />);
      provideRegistrationCredentials(
        'jest-test-password',
        'jest-test-password-2',
      );
      await attemptRegistration();

      expect(authUtils.register).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it("calls 'authUtils.register' when 'Register' button is pressed with correct data", async () => {
      const spy = jest.spyOn(authUtils, 'register');

      render(<App />);
      provideRegistrationCredentials();
      await attemptRegistration();

      expect(authUtils.register).toHaveBeenCalled();

      spy.mockRestore();
    });

    it("calls 'authUtils.login' after successful registration", async () => {
      const postSpy = jest.spyOn(axios, 'post');
      postSpy.mockImplementationOnce(() => {
        return Promise.resolve({status: 201});
      });
      const loginSpy = jest.spyOn(authUtils, 'login');

      render(<App />);
      provideRegistrationCredentials();
      await attemptRegistration();

      expect(authUtils.login).toHaveBeenCalled();

      postSpy.mockRestore();
      loginSpy.mockRestore();
    });

    it("shows error message when 'authUtils.register' fails", async () => {
      const spy = jest.spyOn(axios, 'post');
      spy.mockImplementationOnce(() => {
        return Promise.reject({message: 'jest-mock-error'});
      });

      render(<App />);
      provideRegistrationCredentials();
      await attemptRegistration();

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
      provideRegistrationCredentials();
      await attemptRegistration();

      expect(screen.getByText(/jest-mock-error/)).toBeOnTheScreen();

      spy.mockRestore();
    });

    it("proceeds to 'Home' screen after successful registration", async () => {
      const postSpy = jest.spyOn(axios, 'post');
      postSpy.mockImplementationOnce(() => {
        return Promise.resolve({status: 201});
      });
      const loginSpy = jest.spyOn(authUtils, 'login');
      loginSpy.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            access: 'jest-mock-token',
          },
        }),
      );

      render(<App />);
      provideRegistrationCredentials();
      await attemptRegistration();

      expect(screen.getByText(/Home/)).toBeOnTheScreen();

      postSpy.mockRestore();
      loginSpy.mockRestore();
    });
  });
});

// TODO both login and registration should have tests to check if email and username were actually properly loaded, but we still don't have it since we are waiting for PR from @trissve that adds that functionality to login

// TODO some of tests could actually be moved to authUtils.tests.ts
