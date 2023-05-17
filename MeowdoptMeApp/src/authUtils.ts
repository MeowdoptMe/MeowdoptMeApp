import axios, {isAxiosError} from 'axios';
import {databaseUrl} from './Database';

async function login(username: string, password: string) {
  try {
    const response = await axios.post(`${databaseUrl}/userAuth/login/`, {
      username,
      password,
    });
    return response.data.access;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response) {
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
    await axios.post(`${databaseUrl}/userAuth/register/`, {
      username,
      email,
      password,
    });
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e?.response?.data?.email) {
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

export default {
  login,
  register,
};
