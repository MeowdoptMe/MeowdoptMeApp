import {
  AdFilters,
  AppSettings,
  PreferencesScreen,
} from "./types";

describe("PreferencesScreen class", () => {
  it("renders", () => {
    // TODO to be corrected later on
    let preferencesScreen: PreferencesScreen;
    try {
      // @ts-expect-error
      preferencesScreen.render();
    } catch (error) {
      fail(error);
    }
  });

  it("changes filters property with setFilters", () => {
    // TODO to be corrected later on
    let preferencesScreen: PreferencesScreen;
    const filters: AdFilters = {
      petCharacteristics: {
        species: "cat",
        age: 2,
        gender: "female",
        color: "white",
      },
      setPetCharacteristics: () => {},
    };

    // @ts-expect-error
    preferencesScreen.setFilters(filters);
    // @ts-expect-error
    expect(preferencesScreen.adFilters).toBe(filters);
  });

  it("changes settings property with setSettings", () => {
    // TODO to be corrected later on
    let preferencesScreen: PreferencesScreen;
    const settings: AppSettings = {
      setPassword: () => {},
      setUsername: () => {},
      setMail: () => {},
      deleteAccount: () => {},
      logout: () => {},
    };

    // @ts-expect-error
    preferencesScreen.setSettings(settings);
    // @ts-expect-error
    expect().toBe(settings);  // to be completed (but how?)
  });
});
