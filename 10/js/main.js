import './forms.js';
import './slider.js';

//получение данных с сервера
import {createUserPhotos} from './newphotos.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const onGetDataSuccess = (photos) => {
  createUserPhotos(photos.slice(0, 25));
};

getData(onGetDataSuccess, () => showAlert('Не удалось загрузить фотографии'));
