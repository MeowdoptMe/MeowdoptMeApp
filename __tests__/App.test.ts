import { App } from "./types";

describe("App class", () => {
  it("sets current screen with setCurrentScreen", () => {
    let app: App;
    let screen: Screen;

    // @ts-expect-error
    app.setCurrentScreen(screen);
    // @ts-expect-error
    expect(app.currentScreen).toBe(screen);
  });
});
