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
        throw new Error(e.response.data.detail);
      } else {
        throw new Error(e.message);
      }
    }
  }
}

export {login};
