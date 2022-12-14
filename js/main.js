const textAlert = 'Не удалось загрузить фотографии';

import './forms.js';
import './slider.js';

import {addDefaultButtonListener, addRandomButtonListener, addDiscussedButtonListener} from './filters.js';
import {createUserPhotos} from './new-photos.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const onGetDataSuccess = (photos) => {
  createUserPhotos(photos.slice(0, 25));
  addDefaultButtonListener(photos);
  addRandomButtonListener(photos);
  addDiscussedButtonListener(photos);
};

getData(onGetDataSuccess, () => showAlert(textAlert));
