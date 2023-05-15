import type {
  Database,
  User,
  Shelter,
  Ad,
  Permission,
  PermissionRequest,
} from './types';

let database: Database;
let user: User;
let shelter: Shelter;
let ad: Ad;
let permission: Permission;
let permissionRequest: PermissionRequest;

// getAds: () => unknown;
//   getShelters: () => unknown;
//   getUsers: () => unknown;
//   registerUser: (user: User) => unknown;
//   authUser: (user: User) => unknown;
//   getShelterData: (shelter: Shelter) => unknown;
//   getAdData: (ad: Ad) => unknown;
//   setAd: (ad: Ad) => unknown;
//   removeAd: (ad: Ad) => unknown;
//   setPermissions: (permission: Permission) => unknown;
//   registerRequest: (request: PermissionRequest) => unknown;
//   setShelter: (shelter: Shelter) => unknown;

describe('PermissionRequest class', () => {
  beforeEach(() => {
    // @ts-expect-error
    database = {};
    // @ts-expect-error
    user = {};
    // @ts-expect-error
    shelter = {};
    // @ts-expect-error
    ad = {};
    // @ts-expect-error
    permission = {};
    // @ts-expect-error
    permissionRequest = {};
  });
  it('gets ads from database with getAds', () => {
    expect(database.getAds()).toBeDefined();
  });
  it('gets shelters from database with getShelters', () => {
    expect(database.getShelters()).toBeDefined();
  });
  it('gets users from database with getUsers', () => {
    expect(database.getUsers()).toBeDefined();
  });
  it('registers user with registerUser', () => {
    try {
      database.registerUser(user);
    } catch (error) {
      fail(error);
    }
  });
  it('gets data about shelter from database with getShelterData', () => {
    expect(database.getShelterData(shelter)).toBeDefined();
  });
  it('sets add with setAd', () => {
    try {
      database.setAd(ad);
    } catch (error) {
      fail(error);
    }
  });
  it('removes add with removeAdd', () => {
    try {
      database.setAd(ad);
    } catch (error) {
      fail(error);
    }
  });
  it('sets permission with setPermission', () => {
    try {
      database.setPermissions(permission);
    } catch (error) {
      fail(error);
    }
  });
  it('register request to shelter with registerRequest', () => {
    try {
      database.registerRequest(permissionRequest);
    } catch (error) {
      fail(error);
    }
  });
  it('sets shelter with setShelter', () => {
    try {
      database.setShelter(shelter);
    } catch (error) {
      fail(error);
    }
  });
});
