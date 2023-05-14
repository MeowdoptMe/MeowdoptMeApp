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
  await new Promise(resolve => setTimeout(resolve, 4000));
  throw new Error('Woof! Not implemented');
}

export {login, register};
