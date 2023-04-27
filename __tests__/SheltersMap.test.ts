import type { SheltersMap, App, Shelter, ShelterPage } from "./types";

describe("SheltersMap class", () => {
    it("sets currentScreen with goToShelter", () => {
      
      let app: App;
      let shelter: Shelter;
      let shelterpage: ShelterPage;
      let shelterMap: SheltersMap;
      // @ts-expect-error
      shelterpage.shelter = shelter;
      // @ts-expect-error
      shelterMap.goToShelter(shelter);
      // @ts-expect-error
      expect(app.currentScreen).toBe(shelterpage);
    });
});
