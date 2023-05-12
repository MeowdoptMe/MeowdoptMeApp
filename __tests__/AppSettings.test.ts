import { AppSettings, User, App } from './types';

describe('AppSettings class', () => {
  it("changes user's password with setPassword", () => {
    // TODO to be corrected later on
    let settings: AppSettings;
    let app: App;
    const user: User = {
      id: 60,
      username: 'Kremówka',
      password: 'bigKremuwczan',
      mail: 'kremowka@kremowkamail.va',
      // @ts-expect-error
      permissions: {},
      requests: [],
    };
    // @ts-expect-error
    app.loggedInUser = user;
    const password = 'test';
    // @ts-expect-error
    settings.setPassword(password);
    expect(user.password).toBe(password);
  });

  it("changes user's username with setUsername", () => {
    // TODO to be corrected later on
    let settings: AppSettings;
    let app: App;
    const user: User = {
      id: 60,
      username: 'Kremówka',
      password: 'bigKremuwczan',
      mail: 'kremowka@kremowkamail.va',
      // @ts-expect-error
      permissions: {},
      requests: [],
    };
    // @ts-expect-error
    app.loggedInUser = user;
    const username = 'Kremuwka';
    // @ts-expect-error
    settings.setUsername(username);
    expect(user.username).toBe(username);
  });

  it("changes user's mail with setMail", () => {
    // TODO to be corrected later on
    let settings: AppSettings;
    let app: App;
    const user: User = {
      id: 60,
      username: 'Kremówka',
      password: 'bigKremuwczan',
      mail: 'kremowka@kremowkamail.va',
      // @ts-expect-error
      permissions: {},
      requests: [],
    };
    // @ts-expect-error
    app.loggedInUser = user;
    const mail = 'kremuwka@mail.va';
    // @ts-expect-error
    settings.setMail(mail);
    expect(user.mail).toBe(mail);
  });

  it("deletes user's account with deleteAccount", () => {
    // TODO to be corrected later on
    let settings: AppSettings;
    try {
      // @ts-expect-error
      settings.deleteAccount();
    } catch (error) {
      fail(error);
    }
  });

  it('logs user out with logout', () => {
    // TODO to be corrected later on
    let settings: AppSettings;
    try {
      // @ts-expect-error
      settings.logout();
    } catch (error) {
      fail(error);
    }
  });
});
