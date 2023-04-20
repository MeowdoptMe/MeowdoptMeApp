import type {
  Shelter,
  PhotoAlbum,
  ContactInfo,
  PermissionsList,
  Permission,
  PermissionRequest,
} from "./types";

let perm: Permission = {
  // @ts-expect-error
  user: {},
  // @ts-expect-error
  shelter: {},
  value: 1,
};
// @ts-expect-error
let permList: PermissionsList = {
  permissions: [perm],
};
// @ts-expect-error
let user: User = {
  id: 1,
  username: "gocha",
  password: "2137",
  mail: "gocha@gmail.com",
  permissions: permList,
  requests: [],
};
let shelter: Shelter = {
  id: 1,
  name: "ioioioio",
  associates: [user],
  permissionRequests: [],
  // @ts-expect-error
  photoAlbum: {},
  // @ts-expect-error
  contactInfo: {},
};
let permissionRequest: PermissionRequest = {
  permission: perm,
  cancelRequest() {},
};

describe("Shelter class", () => {
  it("with removePermission", () => {
    shelter.removePermission(perm, user);
    expect(user.permissions).not.toContain(perm);
  });

  it("with resolveRequest", () => {
    shelter.resolveRequest(permissionRequest);
    expect(permissionRequest.permission.user.permissions).toContain(
      permissionRequest.permission
    );
  });
  //TODO chcemy sprawdzic czy poprzednie permissions zostało usuniete i wskoczyło nowe???
  it("with modifyAssociate", () => {
    shelter.modifyAssociate(user, perm);
  });

  it("with setName", () => {
    shelter.setName("alamakota");
    expect(shelter.name).toBe("alamakota");
  });

  it("with makeRequest", () => {
    shelter.makeRequest(permissionRequest);
    expect(shelter.permissionRequests).toContain(permissionRequest);
  });

  it("with setContactInfo", () => {
    // @ts-expect-error
    let info: ContactInfo = {};
    shelter.setContactInfo(info);
    expect(shelter.contactInfo).toBe(info);
  });

  it("with getAdList", () => {
    expect(shelter.getAdList()).toBeDefined();
  });

  it("with showAssociatesPermissions", () => {
    let users = shelter.getAssociatesByPermissions(perm);
    expect(users).toContain(user);
  });
});
