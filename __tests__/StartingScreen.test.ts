import type { StartingScreen, App, Database } from "./types";

let startingScreen: StartingScreen;
let app: App;
let db: Database;
describe("Screen class", () => {
  beforeEach(() => {
    startingScreen: {
    }
    app: {
    }
    db: {
    }
  });
  it("login user in StartingScreen with login", () => {
    startingScreen.login("ewa", "root");
    expect(app.loggedInUser.username).toBe("ewa");
  });
  it("register user in StartingScreen with register", () => {
    //TODO
  });
  it("resetPassword user in StartingScreen with resetPassword", () => {
    try {
      startingScreen.resetPassword("ewa@gmail.com");
    } catch (error) {
      fail(error);
    }
  });
  it("renders startingSreen", () => {
    // TODO to be corrected later on
    let startingScreen: StartingScreen;
    try {
      // @ts-expect-error
      screen.render();
    } catch (error) {
      fail(error);
    }
  });
});
