import axios, {isAxiosError} from 'axios';
import Database from './Database';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

async function login(username: string, password: string) {
  try {
    const response = await axios.post(Database.loginUrl, {
      username,
      password,
    });
    return response.data.access;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data?.detail) {
        throw e.response.data.detail;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function register(username: string, email: string, password: string) {
  try {
    await axios.post(Database.registerUrl, {
      username,
      email,
      password,
    });
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data?.email) {
        throw e.response.data.email[0];
      }
      if (e?.response?.data?.username) {
        throw e.response.data.username[0];
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function resetPassword(email: string) {
  try {
    await axios.post(Database.resetPasswordUrl, {email});
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data?.email) {
        throw e.response.data.email[0];
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

export default {
  sleep,
  login,
  register,
  resetPassword,
  isValidEmail,
};
