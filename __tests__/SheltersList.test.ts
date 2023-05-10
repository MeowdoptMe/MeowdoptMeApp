import { SheltersList } from './types';

describe('SheltersList class', () => {
  it('gets shelters from database with getShelters', () => {
    // TODO to be corrected later on
    let sheltersList: SheltersList;
    try {
      // @ts-expect-error
      sheltersList.getShelters();
    } catch (error) {
      fail(error);
    }
  });

  it('goes to shelter with goToShelter', () => {
    // TODO to be corrected later on
    let sheltersList: SheltersList;
    try {
      // @ts-expect-error
      sheltersList.goToShelter();
    } catch (error) {
      fail(error);
    }
  });

  it('scrolls with scroll', () => {
    // TODO to be corrected later on
    let sheltersList: SheltersList;
    try {
      // @ts-expect-error
      sheltersList.scroll();
    } catch (error) {
      fail(error);
    }
  });
});
