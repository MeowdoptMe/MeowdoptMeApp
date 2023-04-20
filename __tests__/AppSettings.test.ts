import { AppSettings, User } from "./types";

describe("AppSettings class", () => {
    it("changes password property in AppSettings with setPassword", () => {
        // TODO to be corrected later on
        let settings: AppSettings;
        const user: User = {
          id: 60,
          username: "Kremówka",
          password: "test",
          mail: "kremowka@kremowkamail.va",
          // @ts-expect-error
          permissions: {},
          requests: []
        };
        // @ts-expect-error
        settings.setPassword(user.password);
        // @ts-expect-error
        expect(settings.user.password).toBe(password);
      });

    it("changes username property in AppSettings with setUsername", () => {
      // TODO to be corrected later on
      let settings: AppSettings;
      const user: User = {
        id: 60,
        username: "Kremówka",
        password: "test",
        mail: "kremowka@kremowkamail.va",
        // @ts-expect-error
        permissions: {},
        requests: []
      };
      // @ts-expect-error
      settings.setUsername(user.username);
      // @ts-expect-error
      expect(settings.user.username).toBe(username);
    });

    it("changes mail property in AppSettings with setMail", () => {
      // TODO to be corrected later on
      let settings: AppSettings;
      const user: User = {
        id: 60,
        username: "Kremówka",
        password: "test",
        mail: "kremowka@kremowkamail.va",
        // @ts-expect-error
        permissions: {},
        requests: []
      };
      // @ts-expect-error
      settings.setMail(user.mail);
      // @ts-expect-error
      expect(settings.user.mail).toBe(user.mail);
    });

    it("deletes account property in AppSettings with deleteAccount", () => {
      // TODO to be corrected later on
      let settings: AppSettings;
      // to be completed (but how?...)
    });

    it("logouts property in AppSettings with logout", () => {
      // TODO to be corrected later on
      let settings: AppSettings;
      // to be completed (but how?...)

    });
})
