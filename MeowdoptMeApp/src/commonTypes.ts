export interface Ad {
  id: number;
  pet: Pet;
  // active: boolean;
  // shelter: Shelter;
  photoAlbum: PhotoAlbum;
}

export interface PhotoAlbum {
  id: number;
  photos: Photo[];
  // instead of add
  // addPhoto: (photo: Photo) => void;
  // instead of delete
  // removePhoto: (photo: Photo) => void;
}

export interface Pet {
  name: string;
  petCharacteristics: PetCharacteristics;
}

export interface Photo {
  img: string;
  description: string;
  // setImg: (img: object) => void;
  // setDescription: (description: string) => void;
}

export interface PetCharacteristics {
  species: string;
  breed?: string;
  dateOfBirth?: DateOfBirth;
  gender: string;
  color: string;
}

interface DateOfBirth {
  year: number;
  month: number;
}
