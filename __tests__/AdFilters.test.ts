import { AdFilters, PetCharacteristics } from "./types";

it("changes petCharacteristics property with setPetCharacteristics", () => {
    // TODO to be corrected later on
    let adFilters: AdFilters;
    const characteristics: PetCharacteristics = {
        species: "cat",
        age: 2,
        gender: "female",
        color: "white",     
    }
    // @ts-expect-error
    adFilters.setPetCharacteristics(characteristics);
    // @ts-expect-error
    expect(adFilters.petCharacteristics).toBe(characteristics);
});
