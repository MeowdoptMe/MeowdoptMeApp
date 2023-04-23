// @ts-expect-error
import type { ShelterPage, App, ContactInfo } from "./types";

describe("ShelterPage class", () => {
  it("goes to shelter Ad bound with ShelterPage with goToShelter", () => {
    // TODO to be corrected later on
    let shelterPage: ShelterPage;
    try {
      // @ts-expect-error
      shelterPage.goToShelter();
    } catch (error) {
      fail(error);
    }
  });

  it("exits shelterPage with exitShelterPage", () => {
    let app: App;
    let shelterPage: ShelterPage;
    // @ts-expect-error
    app.setCurrentScreen(shelterPage);
    // @ts-expect-error
    shelterPage.exitShelterPage();
    // @ts-expect-error
    expect(app.currentScreen).not.toBe(shelterPage);
  });

  it("finds an Ad with findAd", () => {
    let shelterPage: ShelterPage;
    try {
      // @ts-expect-error
      shelterPage.findAd();
    } catch (error) {
      fail(error);
    }
  });

  it("edits shelter with editShelter", () => {
    let shelterPage: ShelterPage;
    try {
      // @ts-expect-error
      shelterPage.editShelter();
    } catch (error) {
      fail(error);
    }
  });

  it("gets contactInfo with getContactInfo", () => {
    let shelterPage: ShelterPage;
    // @ts-expect-error
    const contactInfo: ContactInfo = shelterPage.getContactInfo();
    expect(contactInfo).toBeDefined();
  });
});
