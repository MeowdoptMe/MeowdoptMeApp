import type { Ad, Pet } from './types';

describe('Ad class', () => {
  it('changes pet property with setPet', () => {
    // TODO to be corrected later on
    let ad: Ad;
    const pet: Pet = {
      name: 'Garfield',
      petCharacteristics: {
        species: 'cat',
        subSpecies: 'persian',
        age: 5,
        gender: 'male',
        color: 'orange',
      },
    };
    // @ts-expect-error
    ad.setPet(pet);
    // @ts-expect-error
    expect(ad.pet).toBe(pet);
  });

  it('changes active property with setActive', () => {
    // TODO to be corrected later on
    let ad: Ad;
    // @ts-expect-error
    const currentActive = ad.active;
    // @ts-expect-error
    ad.setActive(!currentActive);
    // @ts-expect-error
    expect(ad.active).toBe(!currentActive);
  });

  it('changes shelter property with setShelter', () => {
    // TODO to be corrected later on
    let ad: Ad;
    // @ts-expect-error
    const shelter: Shelter = {};
    // @ts-expect-error
    ad.setShelter(shelter);
    // @ts-expect-error
    expect(ad.shelter).toBe(shelter);
  });

  it('returns contact info with getContact', () => {
    // TODO to be corrected later on
    let ad: Ad;
    // @ts-expect-error
    const contactInfo = ad.getContact();
    expect(contactInfo).toBeDefined();
  });

  it('returns share uri with share', () => {
    // TODO to be corrected later on
    let ad: Ad;
    // @ts-expect-error
    const shareUri = ad.share();
    expect(shareUri).toBeDefined();
  });

  it('renders ad', () => {
    // TODO to be corrected later on
    let ad: Ad;
    try {
      // @ts-expect-error
      ad.render();
    } catch (error) {
      fail(error);
    }
  });
});
