import axios, {isAxiosError} from 'axios';
import Database from '../Database';
import {Ad, Photo} from '../commonTypes';

async function getAds(): Promise<Ad[]> {
  try {
    const response = await axios.get(Database.adsUrl);
    return response.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data) {
        throw e.response.data;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

async function getPhotos(id: number): Promise<Photo[]> {
  try {
    const url = `${Database.photoAlbumUrl}${id}/photos`;
    const response = await axios.get(url);
    return response.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response?.data) {
        throw e.response.data;
      } else {
        throw e.message;
      }
    }
    throw e;
  }
}

export default {getAds, getPhotos};
