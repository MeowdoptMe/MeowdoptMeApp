import type { Screen } from "./types";

describe("Screen interface", () => {
  it("renders", () => {
    let screen: Screen;
    try {
      // @ts-expect-error
      screen.render();
    } catch (error) {
      fail(error);
    }
  });
});
