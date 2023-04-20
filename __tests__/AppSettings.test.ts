import { AppSettings } from "./types";

describe("AppSetting class", () => {
    it("changes password property in AppSettings with setPassword", () => {
        // TODO to be corrected later on
        let password: string;
        const newPassword = "test";
        // @ts-expect-error
        password.setPassword(newPassword);
        // @ts-expect-error
        expect().toBe(newPassword);
      });

    it("changes username property in AppSettings with setUsername", () => {
      // TODO to be corrected later on
      let usermane: string;
      const newUsername = "Kremówka";
      // @ts-expect-error
      usermane.setUsername(newUsername);
      // @ts-expect-error
      expect().toBe(newUsername);
    });

    it("changes mail property in AppSettings with setMail", () => {
      // TODO to be corrected later on
      let mail: string;
      const newMail = "kremowka@kremowkamail.va";
      // @ts-expect-error
      mail.setMail(newMail);
      // @ts-expect-error
      expect().toBe(newMail);
    });

    it("deletes account property in AppSettings with deleteAccount", () => {
      // TODO to be corrected later on

    });

    it("logouts property in AppSettings with logout", () => {
      // TODO to be corrected later on

    });
})