import type { PermissionsList, Permission, User, Shelter } from "./types";

describe("PermissionsList class", () => {
  it("adds new element to PermissionsList with addPermission", () => {
    let permission: Permission {
      user: {},
      shelter: {},
      value: Math.floor(Math.random() * 6);
    };
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission);

    // @ts-expect-error
    expect(list.permissions).toContain(permission1);
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

  it("removes two permissions from PermissionsList with removePermission", () => {
    
    let permission1: Permission {
      user: {},
      shelter: {},
      value: 5,
    };
    let permission2: Permission {
      user: {},
      shelter: {},
      value: 1,
    };

    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission([permission1, permission2]);
    // @ts-expect-error
    list.removePermission([permission1, permission2]);
    // @ts-expect-error
    expect(list.permissions).not.toContain(permission1);
  });
});
