// sample data
// I restored this data because the list with
// static images is lagging as hell
const ads = [
  {
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
        description:
          'Fifek is an energetic and friendly dog. He loves outdoor activities and playing fetch. He gets along well with other dogs and enjoys the company of humans. Fifek would make a great companion for an active individual or family.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#FF33A0FF',
        description: "Fifek's photo 1",
      },
      {
        backgroundColor: '#FF33C0FF',
        description: "Fifek's photo 2",
      },
      {
        backgroundColor: '#FF33E0FF',
        description: "Fifek's photo 3",
      },
      {
        backgroundColor: '#FF33F0FF',
        description: "Fifek's photo 4",
      },
    ],
  },
  {
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
        description:
          'Pumpon is a playful and affectionate dog. He enjoys long walks and cuddling with his humans. Pumpon gets along well with children and is friendly towards other animals. He would thrive in a loving and active home.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#AFFFFFFF',
        description: "Pumpon's photo 1",
      },
      {
        backgroundColor: '#AFFFDFFF',
        description: "Pumpon's photo 2",
      },
      {
        backgroundColor: '#AFFFBFFF',
        description: "Pumpon's photo 3",
      },
      {
        backgroundColor: '#AFFF0FFF',
        description: "Pumpon's photo 4",
      },
    ],
  },
  {
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
        description:
          'Brokuł is a gentle and calm dog. He enjoys leisurely walks and lounging in the sun. Brokuł is friendly towards humans and other animals. He would be a perfect companion for someone looking for a relaxed and loving dog.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#FFAFFFFF',
        description: "Brokuł's photo 1",
      },
      {
        backgroundColor: '#DFAFFFFF',
        description: "Brokuł's photo 2",
      },
      {
        backgroundColor: '#BFAFFFFF',
        description: "Brokuł's photo 3",
      },
      {
        backgroundColor: '#9FAFFFFF',
        description: "Brokuł's photo 4",
      },
    ],
  },
  {
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
        description:
          'Amir is an intelligent and loyal dog. He loves learning new tricks and enjoys being challenged mentally. Amir gets along well with people of all ages and is always eager to please. He would thrive in a loving and active household.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#0FFFFFFF',
        description: "Amir's photo 1",
      },
      {
        backgroundColor: '#0FDFFFFF',
        description: "Amir's photo 2",
      },
      {
        backgroundColor: '#0FBFFFFF',
        description: "Amir's photo 3",
      },
      {
        backgroundColor: '#0F9FFFFF',
        description: "Amir's photo 4",
      },
    ],
  },
  {
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
        description:
          'Kluska is a friendly and curious cat. She enjoys exploring her surroundings and chasing toys. Kluska is sociable and gets along well with other cats and calm dogs. She would make a wonderful companion for a cat-loving household.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#1F1FFFFF',
        description: "Kluska's photo 1",
      },
      {
        backgroundColor: '#1F3FFFFF',
        description: "Kluska's photo 2",
      },
      {
        backgroundColor: '#1F5FFFFF',
        description: "Kluska's photo 3",
      },
      {
        backgroundColor: '#1F7FFFFF',
        description: "Kluska's photo 4",
      },
    ],
  },
  {
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
        description:
          'Biniu is an energetic and playful dog. He loves running and playing fetch. Biniu gets along well with children and enjoys the company of other dogs. He would be a perfect match for an active family looking for a furry companion.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#BFFF2FFF',
        description: "Biniu's photo 1",
      },
      {
        backgroundColor: '#BFFF4FFF',
        description: "Biniu's photo 2",
      },
      {
        backgroundColor: '#BFFF6FFF',
        description: "Biniu's photo 3",
      },
      {
        backgroundColor: '#BFFF8FFF',
        description: "Biniu's photo 4",
      },
    ],
  },
  {
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
        description:
          'Dyzio is a friendly and outgoing dog. He enjoys playing fetch and going for long walks. Dyzio gets along well with other dogs and is great with children. He would be a loyal and loving companion for an active individual or family.',
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#FFBFFFFF',
        description: "Dyzio's photo 1",
      },
      {
        backgroundColor: '#DFBFFFFF',
        description: "Dyzio's photo 2",
      },
      {
        backgroundColor: '#BFBFFFFF',
        description: "Dyzio's photo 3",
      },
      {
        backgroundColor: '#9FBFFFFF',
        description: "Dyzio's photo 4",
      },
    ],
  },
  {
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
        description:
          "Wojtyłek is a playful and independent cat who enjoys exploring his surroundings. He likes to observe his environment and play with interactive toys. He would be a great companion for someone who appreciates a cat's unique personality.",
      },
    },
    photoAlbum: [
      {
        backgroundColor: '#A10F10FF',
        description: "Wojtyłek's photo 1",
      },
      {
        backgroundColor: '#A10F30FF',
        description: "Wojtyłek's photo 2",
      },
      {
        backgroundColor: '#A10F50FF',
        description: "Wojtyłek's photo 3",
      },
      {
        backgroundColor: '#A10F70FF',
        description: "Wojtyłek's photo 4",
      },
    ],
  },
];

export {ads};
export type Ad = (typeof ads)[number];
