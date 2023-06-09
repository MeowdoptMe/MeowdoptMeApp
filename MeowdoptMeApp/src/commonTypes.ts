export interface Ad {
  id: number;
  pet: Pet;
  description: string;
  // active: boolean;
  shelter: string;
  photoAlbum: PhotoAlbum;
}

export interface Shelter {
  id: number;
  name: string;
  email: string;
  phone: number;
  location: string;
  x_cord: number;
  y_cord: number;
  user: number;
  photoAlbum: PhotoAlbum;
}


export interface PhotoAlbum {
  id: number;
  photos: Photo[];
}

export interface Pet {
  name: string;
  about: string;
  petCharacteristics: PetCharacteristics;
}

export interface Photo {
  img: string;
  description: string;
}

export interface PetCharacteristics {
  species: string;
  breed?: string;
  dateOfBirth: DateOfBirth;
  gender: string;
  color: string;
}

interface DateOfBirth {
  year: number;
  month: number;
}

export interface User {
  username: string;
  mail: string;
  token: string;
  // permissions: PermissionsList;
  // requests: PermissionRequest[];
}
