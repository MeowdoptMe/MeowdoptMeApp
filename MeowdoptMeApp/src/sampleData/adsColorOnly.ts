// sample data
// I restored this data because the list with
// static images is lagging as hell
import {Ad, PhotoAlbum, Photo} from '../commonTypes';

interface PerformantAd extends Ad {
  photoAlbum: PerformantPhotoAlbum;
}

interface PerformantPhotoAlbum extends PhotoAlbum {
  photos: PerformantPhoto[];
}

interface PerformantPhoto extends Photo {
  backgroundColor: string;
}

const performantAds: PerformantAd[] = [
  {
    id: 1,
    pet: {
      name: 'Fifek',
      petCharacteristics: {
        species: 'dog',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2019,
          month: 4,
        },
        color: 'brown',
      },
    },
    photoAlbum: {
      id: 1,
      photos: [
        {
          backgroundColor: '#FF33A0FF',
          img: 'none',
          description: "Fifek's photo 1",
        },
        {
          backgroundColor: '#FF33C0FF',
          img: 'none',
          description: "Fifek's photo 2",
        },
        {
          backgroundColor: '#FF33E0FF',
          img: 'none',
          description: "Fifek's photo 3",
        },
        {
          backgroundColor: '#FF33F0FF',
          img: 'none',
          description: "Fifek's photo 4",
        },
      ],
    },
  },
  {
    id: 2,
    pet: {
      name: 'Pumpon',
      petCharacteristics: {
        species: 'dog',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2020,
          month: 2,
        },
        color: 'white',
      },
    },
    photoAlbum: {
      id: 2,
      photos: [
        {
          backgroundColor: '#AFFFFFFF',
          img: 'none',
          description: "Pumpon's photo 1",
        },
        {
          backgroundColor: '#AFFFDFFF',
          img: 'none',
          description: "Pumpon's photo 2",
        },
        {
          backgroundColor: '#AFFFBFFF',
          img: 'none',
          description: "Pumpon's photo 3",
        },
        {
          backgroundColor: '#AFFF0FFF',
          img: 'none',
          description: "Pumpon's photo 4",
        },
      ],
    },
  },
  {
    id: 3,
    pet: {
      name: 'Brokuł',
      petCharacteristics: {
        species: 'dog',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2018,
          month: 8,
        },
        color: 'brown',
      },
    },
    photoAlbum: {
      id: 3,
      photos: [
        {
          backgroundColor: '#FFAFFFFF',
          img: 'none',
          description: "Brokuł's photo 1",
        },
        {
          backgroundColor: '#DFAFFFFF',
          img: 'none',
          description: "Brokuł's photo 2",
        },
        {
          backgroundColor: '#BFAFFFFF',
          img: 'none',
          description: "Brokuł's photo 3",
        },
        {
          backgroundColor: '#9FAFFFFF',
          img: 'none',
          description: "Brokuł's photo 4",
        },
      ],
    },
  },
  {
    id: 4,
    pet: {
      name: 'Amir',
      petCharacteristics: {
        species: 'dog',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2021,
          month: 5,
        },
        color: 'black',
      },
    },
    photoAlbum: {
      id: 4,
      photos: [
        {
          backgroundColor: '#0FFFFFFF',
          img: 'none',
          description: "Amir's photo 1",
        },
        {
          backgroundColor: '#0FDFFFFF',
          img: 'none',
          description: "Amir's photo 2",
        },
        {
          backgroundColor: '#0FBFFFFF',
          img: 'none',
          description: "Amir's photo 3",
        },
        {
          backgroundColor: '#0F9FFFFF',
          img: 'none',
          description: "Amir's photo 4",
        },
      ],
    },
  },
  {
    id: 5,
    pet: {
      name: 'Kluska',
      petCharacteristics: {
        species: 'cat',
        breed: 'mixed breed',
        gender: 'female',
        dateOfBirth: {
          year: 2019,
          month: 9,
        },
        color: 'tabby',
      },
    },
    photoAlbum: {
      id: 5,
      photos: [
        {
          backgroundColor: '#1F1FFFFF',
          img: 'none',
          description: "Kluska's photo 1",
        },
        {
          backgroundColor: '#1F3FFFFF',
          img: 'none',
          description: "Kluska's photo 2",
        },
        {
          backgroundColor: '#1F5FFFFF',
          img: 'none',
          description: "Kluska's photo 3",
        },
        {
          backgroundColor: '#1F7FFFFF',
          img: 'none',
          description: "Kluska's photo 4",
        },
      ],
    },
  },
  {
    id: 6,
    pet: {
      name: 'Biniu',
      petCharacteristics: {
        species: 'dog',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2020,
          month: 3,
        },
        color: 'golden',
      },
    },
    photoAlbum: {
      id: 6,
      photos: [
        {
          backgroundColor: '#BFFF2FFF',
          img: 'none',
          description: "Biniu's photo 1",
        },
        {
          backgroundColor: '#BFFF4FFF',
          img: 'none',
          description: "Biniu's photo 2",
        },
        {
          backgroundColor: '#BFFF6FFF',
          img: 'none',
          description: "Biniu's photo 3",
        },
        {
          backgroundColor: '#BFFF8FFF',
          img: 'none',
          description: "Biniu's photo 4",
        },
      ],
    },
  },
  {
    id: 7,
    pet: {
      name: 'Dyzio',
      petCharacteristics: {
        species: 'dog',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2022,
          month: 7,
        },
        color: 'brown',
      },
    },
    photoAlbum: {
      id: 7,
      photos: [
        {
          backgroundColor: '#FFBFFFFF',
          img: 'none',
          description: "Dyzio's photo 1",
        },
        {
          backgroundColor: '#DFBFFFFF',
          img: 'none',
          description: "Dyzio's photo 2",
        },
        {
          backgroundColor: '#BFBFFFFF',
          img: 'none',
          description: "Dyzio's photo 3",
        },
        {
          backgroundColor: '#9FBFFFFF',
          img: 'none',
          description: "Dyzio's photo 4",
        },
      ],
    },
  },
  {
    id: 8,
    pet: {
      name: 'Wojtyłek',
      petCharacteristics: {
        species: 'cat',
        breed: 'mixed breed',
        gender: 'male',
        dateOfBirth: {
          year: 2022,
          month: 1,
        },
        color: 'gray',
      },
    },
    photoAlbum: {
      id: 8,
      photos: [
        {
          backgroundColor: '#A10F10FF',
          img: 'none',
          description: "Wojtyłek's photo 1",
        },
        {
          backgroundColor: '#A10F30FF',
          img: 'none',
          description: "Wojtyłek's photo 2",
        },
        {
          backgroundColor: '#A10F50FF',
          img: 'none',
          description: "Wojtyłek's photo 3",
        },
        {
          backgroundColor: '#A10F70FF',
          img: 'none',
          description: "Wojtyłek's photo 4",
        },
      ],
    },
  },
];

export {performantAds};
export type {PerformantAd};
