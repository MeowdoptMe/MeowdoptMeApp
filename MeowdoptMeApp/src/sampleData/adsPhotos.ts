// This has to be hard-coded as react-native is

import {Ad} from '../commonTypes';

// kind-of terrible at loading files dynamically
const ads: Array<Ad> = [];
function loadSampleData() {
  ads.push(require('../data/ads/Beza.json'));
  ads[0].photoAlbum[0].img = require('../data/photos/26.jpg');
  ads[0].photoAlbum[1].img = require('../data/photos/27.jpg');
  ads[0].photoAlbum[2].img = require('../data/photos/28.jpg');
  ads[0].photoAlbum[3].img = require('../data/photos/29.jpg');
  ads[0].photoAlbum[4].img = require('../data/photos/30.jpg');
  ads.push(require('../data/ads/Buzz.json'));
  ads[1].photoAlbum[0].img = require('../data/photos/31.jpg');
  ads[1].photoAlbum[1].img = require('../data/photos/32.jpg');
  ads[1].photoAlbum[2].img = require('../data/photos/33.jpg');
  ads[1].photoAlbum[3].img = require('../data/photos/34.jpg');
  ads[1].photoAlbum[4].img = require('../data/photos/35.jpg');
  ads.push(require('../data/ads/Drops.json'));
  ads[2].photoAlbum[0].img = require('../data/photos/36.jpg');
  ads[2].photoAlbum[1].img = require('../data/photos/37.jpg');
  ads[2].photoAlbum[2].img = require('../data/photos/38.jpg');
  ads[2].photoAlbum[3].img = require('../data/photos/39.jpg');
  ads[2].photoAlbum[4].img = require('../data/photos/40.jpg');
  ads.push(require('../data/ads/Łasuch.json'));
  ads[3].photoAlbum[0].img = require('../data/photos/01.jpg');
  ads[3].photoAlbum[1].img = require('../data/photos/02.jpg');
  ads[3].photoAlbum[2].img = require('../data/photos/03.jpg');
  ads[3].photoAlbum[3].img = require('../data/photos/04.jpg');
  ads[3].photoAlbum[4].img = require('../data/photos/05.jpg');
  ads.push(require('../data/ads/Mariusz.json'));
  ads[4].photoAlbum[0].img = require('../data/photos/06.jpg');
  ads[4].photoAlbum[1].img = require('../data/photos/07.jpg');
  ads[4].photoAlbum[2].img = require('../data/photos/08.jpg');
  ads[4].photoAlbum[3].img = require('../data/photos/09.jpg');
  ads[4].photoAlbum[4].img = require('../data/photos/10.jpg');
  ads.push(require('../data/ads/Pola.json'));
  ads[5].photoAlbum[0].img = require('../data/photos/11.jpg');
  ads[5].photoAlbum[1].img = require('../data/photos/12.jpg');
  ads[5].photoAlbum[2].img = require('../data/photos/13.jpg');
  ads[5].photoAlbum[3].img = require('../data/photos/14.jpg');
  ads[5].photoAlbum[4].img = require('../data/photos/15.jpg');
  ads.push(require('../data/ads/Rysia.json'));
  ads[6].photoAlbum[0].img = require('../data/photos/16.jpg');
  ads[6].photoAlbum[1].img = require('../data/photos/17.jpg');
  ads[6].photoAlbum[2].img = require('../data/photos/18.jpg');
  ads[6].photoAlbum[3].img = require('../data/photos/19.jpg');
  ads[6].photoAlbum[4].img = require('../data/photos/20.jpg');
  ads.push(require('../data/ads/Stefan.json'));
  ads[7].photoAlbum[0].img = require('../data/photos/42.jpg');
  ads[7].photoAlbum[1].img = require('../data/photos/43.jpg');
  ads[7].photoAlbum[2].img = require('../data/photos/44.jpg');
  ads[7].photoAlbum[3].img = require('../data/photos/45.jpg');
  ads[7].photoAlbum[4].img = require('../data/photos/46.jpg');
  ads.push(require('../data/ads/Viola.json'));
  ads[8].photoAlbum[0].img = require('../data/photos/47.jpg');
  ads[8].photoAlbum[1].img = require('../data/photos/48.jpg');
  ads[8].photoAlbum[2].img = require('../data/photos/49.jpg');
  ads[8].photoAlbum[3].img = require('../data/photos/50.jpg');
  ads[8].photoAlbum[4].img = require('../data/photos/51.jpg');
  ads.push(require('../data/ads/Zuzia.json'));
  ads[9].photoAlbum[0].img = require('../data/photos/21.jpg');
  ads[9].photoAlbum[1].img = require('../data/photos/22.jpg');
  ads[9].photoAlbum[2].img = require('../data/photos/23.jpg');
  ads[9].photoAlbum[3].img = require('../data/photos/24.jpg');
  ads[9].photoAlbum[4].img = require('../data/photos/25.jpg');
}

loadSampleData();
export {ads};
