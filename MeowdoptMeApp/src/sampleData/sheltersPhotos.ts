
import {Shelter} from '../commonTypes';

const img01 = require('../../data/photos/61.jpg');
const img02 = require('../../data/photos/62.jpg');
const img03 = require('../../data/photos/63.jpg');
const img04 = require('../../data/photos/71.jpg');
const img05 = require('../../data/photos/72.jpg');
const img06 = require('../../data/photos/73.jpg');


const Krakow = require('../../data/shelters/krakow.json');
const Niepolomice = require('../../data/shelters/niepolomice.json');



Krakow.photoAlbum.photos[0].img = img01;
Krakow.photoAlbum.photos[1].img = img02;
Krakow.photoAlbum.photos[2].img = img03;

Niepolomice.photoAlbum.photos[0].img = img04;
Niepolomice.photoAlbum.photos[1].img = img05;
Niepolomice.photoAlbum.photos[2].img = img06;


const shelters: Array<Shelter> = [Krakow, Niepolomice];

export {shelters};
