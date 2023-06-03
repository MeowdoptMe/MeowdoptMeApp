export interface Ad {
  id: number;
  pet: Pet;
  // active: boolean;
  shelter: string;
  photoAlbum: PhotoAlbum;
}

export interface Shelter {
  id: number;
  name: string;
  email: string;
  phone: number;
  location: string;
  x_cord: number;
  y_cord: number;
  user: number;
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
