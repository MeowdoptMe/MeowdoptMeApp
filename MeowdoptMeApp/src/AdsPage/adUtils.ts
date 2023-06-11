import axios, {isAxiosError} from 'axios';
import Database from '../Database';
import {Ad, Photo} from '../commonTypes';
import type {Asset} from 'react-native-image-picker';

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function getAds(): Promise<Ad[]> {
  try {
    await sleep();
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

async function getAdById(id: number): Promise<Ad> {
  try {
    const url = `${Database.adsUrl}${id}/`;
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

async function editAd(token: string, ad: Ad): Promise<Ad> {
  try {
    const url = `${Database.adsUrl}${ad.id}/`;
    const response = await axios.put(url, ad, {
      headers: {Authorization: `Bearer ${token}`},
    });
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

async function editPhotoDescription() {}

async function editPhotoPicture(
  token: string,
  asset: Asset,
  photoAlbumId: number,
  photoId: number,
) {
  try {
    const url = `${Database.photoAlbumUrl}${photoAlbumId}/${photoId}/`;
    await axios.put(url, asset, {
      headers: {Authorization: `Bearer ${token}`},
    });
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

async function deletePhoto() {}

export default {
  getAds,
  getPhotos,
  getAdById,
  editAd,
  editPhotoDescription,
  editPhotoPicture,
  deletePhoto,
};
