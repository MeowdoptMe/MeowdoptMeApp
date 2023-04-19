import { AdFilters, AppSettings, PetCharacteristics, PreferencesScreen} from "./types";

describe("PreferencesScreen class", () => {
  it("render", () => {
    // TODO to be corrected later on
  });

  it("changes filters property with setFilters", () => {
    // TODO to be corrected later on
    let preferencesScreen: PreferencesScreen;
    const filters: PetCharacteristics = {
      species: "cat",
      age: 2,
      gender: "female",
      color: "white",
    };

    // @ts-expect-error
    preferencesScreen.setFilters(filters);
    // @ts-expect-error
    expect(preferencesScreen.adFilters.petCharacteristics).toBe(filters);  /////////////???????
  });

  it("changes settings property with setSettings", () => {
      // TODO to be corrected later on
      let preferencesScreen: PreferencesScreen;
      const settings: AppSettings = {
        setPassword: () => {},
        setUsername: () => {},
        setMail: () => {},
        deleteAccount: () => {},
        logout: () => {}
      }

      // @ts-expect-error
      preferencesScreen.setSettings(settings);
      // @ts-expect-error
      expect(preferencesScreen.AppSettings.user).toBe(settings);
  });
});
