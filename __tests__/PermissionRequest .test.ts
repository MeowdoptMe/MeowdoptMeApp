import type { PermissionRequest, User, Shelter, Permission } from "./types";

describe("PermissionRequest class", () => {
  it("removes request form user's PermissionRequest list with removeRequest", () => {
    let request: {
      user: {},
      shelter: {},
      permission: {},
    };
    // @ts-expect-error
    user.requests = user.requests.concat([request]);
    // @ts-expect-error
    request.cancelRequest()
    
    // @ts-expect-error
    expect(request.user).toBeUndefined();
  });
});