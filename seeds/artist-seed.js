const { Artist } = require('../models');

const artistData = [
  {
    artist_name: 'Coldplay',
    shows: 01/20/2022
    
  },
  {
    artist_name: 'Ariana Grande',
  },
  {
    artist_name: 'Martin Garrix',
  },
  {
    artist_name: 'Ed Sheeran',
  },
  {
    artist_name: 'Adele',
  },
  {
    artist_name: 'Beyonce',
  },
];

const seedArtist = () => Artist.bulkCreate(artistData);

module.exports = seedArtist;