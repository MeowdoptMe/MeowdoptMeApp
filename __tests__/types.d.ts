export interface Ad {
  adId: number;
  pet: Pet;
  active: boolean;
  shelter: Shelter;
  photoAlbum: PhotoAlbum;

  setPet: (pet: Pet) => void;
  setActive: (active: boolean) => void;
  setShelter: (shelter: Shelter) => void;
  getContact: () => ContactInfo;
  share: () => string;
  render: () => void;
}

export interface Pet {
  name: string;
  petCharacteristics: PetCharacteristics;
}

export interface PetCharacteristics {
  species: string;
  subSpecies?: string;
  age: number;
  gender: string;
  color: string;
}

export interface PhotoAlbum {
  id: number;
  photos: Photo[];
  // instead of add
  addPhoto: (photo: Photo) => void;
  // instead of delete
  removePhoto: (index: int) => void;
}

export interface Photo {
  img: object;
  description: string;

  setImg: (img: object) => void;
  setDescription: (description: string) => void;
}
export interface Permission {
  user: User;
  shelter: Shelter;
  value: number;
}
export interface PermissionsList {
  permissions: Permission[];
  removePermission: (index: int) => void;
}
export interface PermisssionRequest {
  user: User;
  shelter: Shelter;
  permissionType: Permission;
  cancelRequest: () => void;
}