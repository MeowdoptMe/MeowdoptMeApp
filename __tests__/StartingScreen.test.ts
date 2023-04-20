import type { StartingScreen, App, Database } from "./types";

let startingScreen: StartingScreen;
let app: App;
let database: Database;
describe("StartingScreen class", () => {
  beforeEach(() => {
    // @ts-expect-error
    startingScreen = {};
    // @ts-expect-error
    app = {};
    // @ts-expect-error
    database = {};
  });
  it("logs user with login", () => {
    startingScreen.login("ewa", "root");
    expect(app.loggedInUser.username).toBe("ewa");
  });
  it("registers user with register", () => {
    //TODO
  });
  it("resets password user with resetPassword", () => {
    try {
      startingScreen.resetPassword("ewa@gmail.com");
    } catch (error) {
      fail(error);
    }
  });
  it("renders startingSreen", () => {
    // TODO to be corrected later on
    try {
      // @ts-expect-error
      screen.render();
    } catch (error) {
      fail(error);
    }
  });
});
