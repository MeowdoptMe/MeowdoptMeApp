import { PhotoAlbum, Photo } from "./types";

describe("PhotoAlbum class", () => {
  it("adds new photo to photo album", () => {
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
    expect(photoAlbum.photos).toContain(photo); //sprawdzic czy photo jest w tablicy photos[]
  });

  it("removes chosen photo from photo album", () => {
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
