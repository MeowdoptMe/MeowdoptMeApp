export interface Ad {
  id: number;
  pet: Pet;
  description: string;
  photoAlbum: number;
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
  id: number;
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
