import './forms.js';
import './slider.js';

import {createUserPhotos} from './newphotos.js';
createUserPhotos();

fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createUserPhotos(photos.slice(0, 25));
  });

import {setUserFormSubmit} from './forms.js';
import {closeFullPhoto} from './fullphotos.js';

setUserFormSubmit(closeFullPhoto);
