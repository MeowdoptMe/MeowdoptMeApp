import type { PermissionsList, Permission } from "./types";

describe("PermissionsList class", () => {
  it("add new element to PermissionsList", () => {
    let permission: Permission;
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission);

    // @ts-expect-error
    expect(list.permissions[0]).toBe(permission);
  });

  it("removes permission from PermissionsList", () => {
    let permission1: Permission;
    let permission2: Permission;
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission1);
    // @ts-expect-error
    list.addPermission(permission2);
    // @ts-expect-error
    list.removePermission(permission2);
    // @ts-expect-error
    expect(list.permissions[0]).toBe(permission1);
  });
});