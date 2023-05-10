import type { PermissionRequest, User, Shelter } from './types';

let request: PermissionRequest;
let user: User;
let shelter: Shelter;

describe('PermissionRequest class', () => {
  beforeEach(() => {
    // @ts-expect-error
    user = {};
    // @ts-expect-error
    request = {};
    // @ts-expect-error
    shelter = {};
  });
  it("removes request from user's PermissionRequest list with removeRequest", () => {
    user.requests = user.requests.concat([request]);
    request.cancelRequest();
    expect(user.requests).not.toContain(request);
  });
  it("removes request from shelter's PermissionRequest list with removeRequest", () => {
    shelter.permissionRequests = shelter.permissionRequests.concat([request]);
    request.cancelRequest();
    expect(shelter.permissionRequests).not.toContain(request);
  });
});
