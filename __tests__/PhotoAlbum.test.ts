import { PhotoAlbum, Photo } from "./types";

describe("PhotoAlbum class", () => {
  it("adds new photo to photo album", () => {
    let photoAlbum: PhotoAlbum;
    const photo: Photo = {
      img: {},
      description: "desc",
      setImg: () => {},
      setDescription: () => {},
    }; //nie wiem jak tutaj

    // @ts-expect-error
    photoAlbum.addPhoto(photo);
    // @ts-expect-error
    expect(photoAlbum.photos).toContain(photo); //sprawdzic czy photo jest w tablicy photos[]
  });

  it("removes chosen photo from photo album", () => {
    let photoAlbum: PhotoAlbum;
    const index: number = 2; //chcialabym sobie zapisac aktualne photo na podanych indeksie, zeby potem sprawdzic czy w miejscu tego indeksu jest cos innego
    // const prev_photo = photoAlbum.photos[index];

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
