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

export interface PreferencesScreen {
  adFilters: AdFilters;
  settings: AppSettings;

  render: () => void;
  setFilters: (filters: AdFilters) => void;
  setSettings: (settings: AppSettings) => void;
}

export interface AdFilters {
  petCharacteristics: PetCharacteristics;

  setPetCharacteristics: (petCharacteristics: PetCharacteristics) => void;
}

export interface AppSettings {
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
  setMail: (mail: string) => void;
  deleteAccount: () => void;
  logout: () => void;
}