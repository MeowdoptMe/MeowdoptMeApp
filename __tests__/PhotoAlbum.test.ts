import { PhotoAlbum, Photo } from "./types";

describe("PhotoAlbum class", () => {
  it("adds new photo with aAddPhoto", () => {
    let photoAlbum: PhotoAlbum;
    const photo: Photo = {
      img: {},
      description: "desc",
      setImg: () => {},
      setDescription: () => {},
    };

    // @ts-expect-error
    photoAlbum.addPhoto(photo);
    // @ts-expect-error
    expect(photoAlbum.photos).toContain(photo);
  });

  it("removes chosen photo with removePhoto", () => {
    let photoAlbum: PhotoAlbum;

    const photo: Photo = {
      img: {},
      description: "desc",
      setImg: () => {},
      setDescription: () => {},
    };

    // @ts-expect-error
    photoAlbum.addPhoto(photo);

    // @ts-expect-error
    photoAlbum.removePhoto(photo);
    // @ts-expect-error
    expect(photoAlbum.photos).not.toContain(photo);
  });
});
