import type { SheltersMap, App, Shelter, ShelterPage } from './types';

describe('SheltersMap class', () => {
  it('sets currentScreen with goToShelter', () => {
    let app: App;
    let shelter: Shelter;
    let shelterPage: ShelterPage;
    let shelterMap: SheltersMap;
    // @ts-expect-error
    shelterPage.shelter = shelter;
    // @ts-expect-error
    shelterMap.goToShelter(shelter);
    // @ts-expect-error
    expect(app.currentScreen).toBe(shelterPage);
  });
});
