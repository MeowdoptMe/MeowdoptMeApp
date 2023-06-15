import axios, {isAxiosError} from 'axios';
import Database from '../Database';
import {Ad, Photo} from '../commonTypes';
import type {Asset} from 'react-native-image-picker';

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, 500));
}

async function getAds(): Promise<Ad[]> {
  try {
    const sleepPromise = sleep();
    const response = await axios.get(Database.adsUrl);
    await sleepPromise;
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

async function editPhotoDescription(
  token: string,
  description: string,
  photoAlbumId: number,
  photoId: number,
) {
  try {
    const url = `${Database.photoAlbumUrl}${photoAlbumId}/photos/${photoId}/`;
    await axios.put(
      url,
      {description},
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

async function editPhotoPicture(
  token: string,
  asset: Asset,
  photoAlbumId: number,
  photoId: number,
) {
  try {
    const url = `${Database.photoAlbumUrl}${photoAlbumId}/photos/${photoId}/`;
    const data = new FormData();
    data.append('img', {
      name: asset.fileName,
      type: asset.type,
      uri: asset.uri,
    });
    await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
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

async function addPhotoToAlbum(
  token: string,
  asset: Asset,
  photoAlbumId: number,
) {
  try {
    const url = `${Database.photoAlbumUrl}${photoAlbumId}/photos/add/`;
    const data = new FormData();
    data.append('img', {
      name: asset.fileName,
      type: asset.type,
      uri: asset.uri,
    });
    await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
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

async function getShelterData(id: number) {
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

async function deletePhoto() {}

export default {
  getAds,
  getPhotos,
  getAdById,
  editAd,
  editPhotoDescription,
  editPhotoPicture,
  deletePhoto,
  getShelterData,
  addPhotoToAlbum,
};
