import { App } from "./types";

describe("App class", () => {
    it("setting current screen to specific one", () => {
      
      let app: App;
      const screen = "test";
        // tu nie wiem co
      
      // @ts-expect-error
      app.setCurrentScreen(screen);
      // @ts-expect-error
      expect(app.currentScreen).toBe(screen);
    });
});