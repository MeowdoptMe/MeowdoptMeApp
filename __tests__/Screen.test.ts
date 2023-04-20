import type { Screen } from "./types";

describe("Screen class", () => {
  it("renders screen", () => {
    // is nessessary???
    let screen: Screen;
    try {
      // @ts-expect-error
      screen.render();
    } catch (error) {
      fail(error);
    }
  });
});
