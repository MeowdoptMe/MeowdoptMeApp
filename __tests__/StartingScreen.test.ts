import type { StartingScreen, App } from './types';

let startingScreen: StartingScreen;
let app: App;
describe('StartingScreen class', () => {
  beforeEach(() => {
    // @ts-expect-error
    startingScreen = {};
    // @ts-expect-error
    app = {};
  });
  it('logs user in with login', () => {
    startingScreen.login('ewa', 'root');
    expect(app.loggedInUser.username).toBe('ewa');
  });
  it('registers user with register', () => {
    // TODO
  });
  it("resets user's password with resetPassword", () => {
    try {
      startingScreen.resetPassword('ewa@gmail.com');
    } catch (error) {
      fail(error);
    }
  });
  it('renders startingSreen', () => {
    // TODO to be corrected later on
    try {
      // @ts-expect-error
      screen.render();
    } catch (error) {
      fail(error);
    }
  });
});
