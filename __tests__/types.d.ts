export interface App {
  currentScreen: Screen;
  loggedInUser: User;
  database: Database;

  setCurrentScreen: (screen: Screen) => void;
}

export interface Database {
  getAds: () => unknown;
  getShelters: () => unknown;
  getUsers: () => unknown;
  registerUser: (user: User) => unknown;
  authUser: (user: User) => unknown;
  getShelterData: (shelter: Shelter) => unknown;
  getAdData: (ad: Ad) => unknown;
  setAd: (ad: Ad) => unknown;
  removeAd: (ad: Ad) => unknown;
  setPermissions: (permission: Permission) => unknown;
  registerRequest: (request: PermissionRequest) => unknown;
  setShelter: (shelter: Shelter) => unknown;
}

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
  removePhoto: (photo: Photo) => void;
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
  addPermission: (permission: Permission) => void;
  removePermission: (permission: Permission) => void;
}

export interface PermissionRequest {
  user: User;
  shelter: Shelter;
  permissionType: Permission;
  cancelRequest: () => void;
}

export interface PreferencesScreen {
  adFilters: AdFilters;
  settings: AppSettings;

  render: () => void;
  setFilters: (filters: AdFilters) => void;
  setSettings: () => void;
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

export interface SheltersListFilters {
  city: string;
  maxDistance: number;

  setFilters: (city: string, maxDistance: number) => void;
}

export interface SheltersList {
  shelters: Shelter[];
  sheltersFilters: ShelterListFilters;

  getShelters: (sheltersList: Database) => void;
  goToShelter: () => void;
  scroll: () => void;
}

export interface Screen {
  render: () => void;
}

export interface HomeScreen extends Screen {}

export interface ScrollPage extends HomeScreen {
  scroll: () => void;
}

export interface AdPage extends ScrollPage {
  ads: Ad[];
  filters: AdFilters;
  currentAd: Ad;
  scrollCurrent: () => void;
  addAd: (ad: Ad) => void;
  setAd: (ad: Ad) => void;
  removeAd: (ad: Ad) => void;
}

export interface ShelterPage extends AdPage {
  shelter: Shelter;
  goToShelter: () => void;
  exitShelterPage: () => void;
  findAd: () => void;
  editShelter: () => void;
  getContactInfo: () => ContactInfo;
}
export interface StartingScreen {
  login: (username: string, pwd: string) => void;
  register: (username: string, password: string, mail: string) => void;
  resetPassword: (mail: string) => void;
  render: () => void;
}

export interface Shelter {
  id: number;
  name: string;
  associates: User[];
  permissionRequests: PermissionRequest[];
  photoAlbum: PhotoAlbum;
  contactInfo: ContactInfo;
  removePermission: (permission: Permission, user: User) => void;
  resolveRequest: (request: PermissionRequest) => void;
  modifyAssociate: (associate: User) => void;
  setName: (newName: string) => void;
  makeRequest: (request: PermissionRequest) => void;
  setContactInfo: (newInfo: ContactInfo) => void;
  getAdList: () => Ad[];
  showAssociatesPermissions: () => void;
}

export interface ContactInfo {
  email: string;
  phone: string;
  user: User;
  location: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  mail: string;
  permissions: PermissionsList;
  requests: PermissionRequest[];
}
