import type { Ad, AdPage } from './types';

let generateAd: () => Ad;
describe('AdPage class', () => {
  beforeAll(() => {
    // @ts-expect-error Shelter is not defined properly here
    generateAd = () => {
      return {
        adId: 1,
        pet: {
          name: 'Garfield',
          petCharacteristics: {
            age: 5,
            species: 'cat',
            subSpecies: 'persian',
            gender: 'male',
            color: 'orange',
          },
        },
        active: false,
        shelter: {},
        photoAlbum: {
          id: 1,
          photos: [],
          addPhoto: () => {},
          removePhoto: () => {},
        },
        setPet: () => {},
        setActive: () => {},
        setShelter: () => {},
        getContact: () => {},
        share: () => 'share uri',
        render: () => {},
      };
    };
  });

  it('adds Ad to ads with addAd', () => {
    let adPage: AdPage;
    const ad = generateAd();

    // @ts-expect-error
    adPage.addAd(ad);

    // @ts-expect-error
    expect(adPage.ads).toContain(ad);
  });

  it('edits Ad with setAd', () => {
    let adPage: AdPage;
    const ad = generateAd();
    const newAd = generateAd();
    newAd.pet.petCharacteristics.gender = 'female';

    // @ts-expect-error
    adPage.addAd(ad);
    // @ts-expect-error
    adPage.setAd(newAd);
    // @ts-expect-error
    expect(adPage.ads).toContain(newAd);
    // @ts-expect-error
    expect(adPage.ads).not.toContain(ad);
  });

  it('removes Ad from ads with removeAd', () => {
    let adPage: AdPage;
    const ad = generateAd();

    // @ts-expect-error
    adPage.addAd(ad);
    // @ts-expect-error
    adPage.removeAd(ad);
    // @ts-expect-error
    expect(adPage.ads).not.toContain(ad);
  });
});
