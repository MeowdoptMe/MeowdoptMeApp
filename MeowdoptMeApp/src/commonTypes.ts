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
}

export interface Pet {
  name: string;
  about: string;
  petCharacteristics: PetCharacteristics;
}

export interface Photo {
  img: string;
  description: string;
}

export interface PetCharacteristics {
  species: string;
  breed?: string;
  dateOfBirth: DateOfBirth;
  gender: string;
  color: string;
}

interface DateOfBirth {
  year: number;
  month: number;
}
