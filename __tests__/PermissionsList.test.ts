import type { PermissionsList, Permission, Shelter } from './types';

describe('PermissionsList class', () => {
  it('adds new element to PermissionsList with addPermission', () => {
    let shelter: Shelter;
    const permission: Permission = {
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
});
