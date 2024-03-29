import axios, {isAxiosError} from 'axios';
import Database from '../Database';
import {Shelter} from '../commonTypes';

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, 500));
}

async function getShelters() {
  try {
    const sleepPromise = sleep();
    const response = await axios.get(Database.getSheltersUrl);
    await sleepPromise;
    return response.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response) {
        throw e.response.data;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function editShelter(shelter: Shelter, token: string) {
  try {
    const {name, email, phone, location} = shelter;
    const url = `${Database.getSheltersUrl}${shelter.id}/`;
    await axios.put(
      url,
      {
        name,
        email,
        phone,
        location,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data.detail) {
        throw e.response.data.detail;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function getShelterById(id: number) {
  try {
    const url = `${Database.getSheltersUrl}${id}/`;
    const response = await axios.get(url);
    return response.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data.detail) {
        throw e.response.data.detail;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

export {getShelters, editShelter, getShelterById};
