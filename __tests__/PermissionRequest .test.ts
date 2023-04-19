import type { PermissionRequest, User, Shelter, Permission } from "./types";

let request: {
  user: {};
  shelter: {};
  permission: {};
};

describe("PermissionRequest class", () => {
  it("removes request from user's PermissionRequest list with removeRequest", () => {
    // @ts-expect-error
    user.requests = user.requests.concat([request]);
    // @ts-expect-error
    request.cancelRequest();
    // @ts-expect-error
    expect(user.request).not.toContain(request);
  });
  it("removes request from shelter's PermissionRequest list with removeRequest", () => {
    // @ts-expect-error
    user.requests = user.requests.concat([request]);
    // @ts-expect-error
    request.cancelRequest();
    // @ts-expect-error
    expect(shelter.permissionRequests).not.toContain(request);
  });
});
