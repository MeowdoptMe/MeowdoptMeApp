import axios, { isAxiosError } from 'axios';
import { databaseUrl } from './Database';


async function getShelters() {
  try {
    const response = await axios.get(`${databaseUrl}/shelters/`);
    //console.log(response.data)
    return response.data;
  } catch (e: unknown) {
    // if (isAxiosError(e)) {
    //   if (e.response) {
    //     throw e.response.data.detail;
    //   } else {
    //     throw e.message;
    //   }
    // }
    throw e;
  }
}


export { getShelters };