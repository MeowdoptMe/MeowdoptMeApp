import type { PermissionsList, Permission, User, Shelter } from "./types";

describe("PermissionsList class", () => {
  it("adds new element to PermissionsList with addPermission", () => {
    let shelter: Shelter;
    let permission: Permission = {
      // @ts-expect-error
      user: {},
      // @ts-expect-error
      shelter: shelter,
      value: 1,
    };
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission);

    // @ts-expect-error
    expect(list.permissions).toContain(permission);
  });

  it("removes permission from PermissionsList with removePermission", () => {
    let permission: Permission;
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission);
    // @ts-expect-error
    list.removePermission(permission);
    // @ts-expect-error
    expect(list.permissions).not.toContain(permission);
  });
  it("checks if an error is thrown if there already is a user with some permissions on the list", () => {
    let user1 = {};
    let user2 = {};
    // @ts-expect-error
    expect(user2.permissions).not.toBe(user1.permissions);
  });
});
