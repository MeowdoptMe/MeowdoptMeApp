import { SheltersListFilters } from "./types";

describe("SheltersListFilters class", () => {
  it("sets filters with setFilters", () => {
    let sheltersListFilters: SheltersListFilters;
    const city = "Warszawa";
    const maxDistance = 10;
    // @ts-expect-error
    sheltersListFilters.setFilters(city, maxDistance);
    // @ts-expect-error
    expect(sheltersListFilters.city).toBe(city);
    // @ts-expect-error
    expect(sheltersListFilters.maxDistance).toBe(maxDistance);
  });
});
