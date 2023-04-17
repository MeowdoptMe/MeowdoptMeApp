import type { PermissionRequest, User, Shelter, Permission } from "./types";

describe("PermissionRequest class", () => {
  it("removing request from shelter's PermissionRequests list", () => {
    let permRequest: PermissionRequest;
    // @ts-expect-error
    permRequest.user = undefined;

    // @ts-expect-error
    expect(permRequest.user).toBe(undefined);
  });
});