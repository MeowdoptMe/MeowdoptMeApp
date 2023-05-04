import type {
  Shelter,
  PhotoAlbum,
  ContactInfo,
  PermissionsList,
  Permission,
  PermissionRequest,
  User,
} from './types';
let permission: Permission;
let user: User;
let shelter: Shelter;
let permissionRequest: PermissionRequest;

describe('Shelter class', () => {
  beforeEach(() => {
    // @ts-expect-error
    permission = {};
    // @ts-expect-error
    user = {};
    // @ts-expect-error
    shelter = {};
    // @ts-expect-error
    permissionRequest = {};
  });

  it('remove permission from user with removePermission', () => {
    shelter.removePermission(permission, user);
    expect(user.permissions).not.toContain(permission);
  });

  it('resolves user request with resolveRequest', () => {
    shelter.resolveRequest(permissionRequest);
    expect(shelter.permissionRequests).not.toContain(permissionRequest);
  });

  it('modifies associate with modifyAssociate', () => {
    try {
      shelter.modifyAssociate(user);
    } catch (error) {
      fail(error);
    }
  });

  it("sets shelter's name with setName", () => {
    shelter.setName('alamakota');
    expect(shelter.name).toBe('alamakota');
  });

  it('makes request with makeRequest', () => {
    shelter.makeRequest(permissionRequest);
    expect(shelter.permissionRequests).toContain(permissionRequest);
  });

  it('sets contact info with setContactInfo', () => {
    // @ts-expect-error
    const info: ContactInfo = {};
    shelter.setContactInfo(info);
    expect(shelter.contactInfo).toBe(info);
  });

  it('gets ad list with getAdList', () => {
    expect(shelter.getAdList()).toBeDefined();
  });

  it("shows associates' permissions with showAssociatesPermissions", () => {
    try {
      shelter.showAssociatesPermissions();
    } catch (error) {
      fail(error);
    }
  });
});
