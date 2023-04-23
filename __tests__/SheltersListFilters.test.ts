import { SheltersListFilters } from "./types";

describe("SheltersListFilters class", () => {
  it("sets filters with setFilters", () => {
    let sheltersListFilters: SheltersListFilters;
    const city: string = "Warszawa";
    const maxDistance: number = 10;
    // @ts-expect-error
    sheltersListFilters.setFilters(city, maxDistance);
    // @ts-expect-error
    expect(sheltersListFilters.city).toBe(city);
    // @ts-expect-error
    expect(sheltersListFilters.maxDistance).toBe(maxDistance);
  });
});
