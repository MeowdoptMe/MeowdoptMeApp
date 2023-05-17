import type { StartingScreen } from './types';

let startingScreen: StartingScreen;
describe('StartingScreen class', () => {
  beforeEach(() => {
    // @ts-expect-error
    startingScreen = {};
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
});
