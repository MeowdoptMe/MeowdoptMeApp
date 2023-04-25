import type { SheltersScreen } from "./types";

describe("SheltersScreen interface", () => {
  it("renders", () => {
    let sheltersScreen: SheltersScreen;
    try {
      // @ts-expect-error
      sheltersScreen.render();
    } catch (error) {
      fail(error);
    }
  });
});