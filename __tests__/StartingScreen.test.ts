import type { StartingScreen, App, Database } from "./types";

let startingScreen: StartingScreen;
let app: App;
let database: Database;
describe("Screen class", () => {
  beforeEach(() => {
    startingScreen: {
    }
    app: {
    }
    database: {
    }
  });
  it("logs user in StartingScreen with login", () => {
    startingScreen.login("ewa", "root");
    expect(app.loggedInUser.username).toBe("ewa");
  });
  it("registers user in StartingScreen with register", () => {
    //TODO
  });
  it("resets password user in StartingScreen with resetPassword", () => {
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
