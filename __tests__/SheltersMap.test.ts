import type { SheltersMap, App, Shelter, ShelterPage } from "./types";

describe("SheltersMap class", () => {
    it("sets currentScreen with goToShelter", () => {
      
      let app: App;
      let shelter: Shelter;
      let shelterpage: ShelterPage;
      // @ts-expect-error
      shelterpage.shelter = shelter;
      // @ts-expect-error
      app.setCurrentScreen(shelterpage);
      // @ts-expect-error
      expect(app.currentScreen).toBe(shelterpage);
    });
});