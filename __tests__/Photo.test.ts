import { Photo } from "./types";

describe("Photo class", () => {
  it("changes img property in Photo with setImg", () => {
    // TODO to be corrected later on
    let photo: Photo;
    const img = {
      uri: "test",
    };
    // @ts-expect-error
    photo.setImg(img);
    // @ts-expect-error
    expect(photo.img).toBe(img);
  });

  it("changes description propety in Photo with setDescription", () => {
    // TODO to be corrected later on
    let photo: Photo;
    const description = "test";
    // @ts-expect-error
    photo.setDescription(description);
    // @ts-expect-error
    expect(photo.description).toBe(description);
  });
});
