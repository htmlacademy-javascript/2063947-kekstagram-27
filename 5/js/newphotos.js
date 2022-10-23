import {createPhotoDescriptions} from './data.js';

//находим шаблон
const newphotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotos = createPhotoDescriptions(25);

//складываем все в фрагмент
const similarPhotosFragment = document.createDocumentFragment();

const createUserPhotos = () => {

  similarPhotos.forEach(({url, likes, description}) => {
    const photoElement = newphotoTemplate.cloneNode(true); //клонируем шаблон
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = description;
    similarPhotosFragment.append(photoElement);
  });

  document.querySelector('.pictures').append(similarPhotosFragment);
};

export {createUserPhotos};

