import type { PermissionsList, Permission, User, Shelter } from './types';

describe('PermissionsList class', () => {
  it('adds new element to PermissionsList with addPermission', () => {
    let shelter: Shelter;
    const permission: Permission = {
      // @ts-expect-error
      user: {},
      // @ts-expect-error
      shelter,
      value: 1,
    };
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission);

    // @ts-expect-error
    expect(list.permissions).toContain(permission);
  });

  it('removes permission from PermissionsList with removePermission', () => {
    let permission: Permission;
    let list: PermissionsList;
    // @ts-expect-error
    list.addPermission(permission);
    // @ts-expect-error
    list.removePermission(permission);
    // @ts-expect-error
    expect(list.permissions).not.toContain(permission);
  });
  it('throws an error when trying to add duplicate permission', () => {
    let list: PermissionsList;
    // @ts-expect-error
    const user: User = {};
    // @ts-expect-error
    const shelter: Shelter = {};
    const permission1: Permission = {
      user,
      shelter,
      value: 1,
    };
    const permission2: Permission = {
      user,
      shelter,
      value: 2,
    };
    // @ts-expect-error
    list.addPermission(permission1);
    try {
      // @ts-expect-error
      list.addPermission(permission2);
    } catch (error) {
      fail(error);
    }
  });
});
