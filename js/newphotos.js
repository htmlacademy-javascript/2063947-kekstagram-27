import {createPhotoDescriptions} from './data.js';
import {openFullPhoto} from './fullphotos.js';

//находим шаблон
const newphotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotos = createPhotoDescriptions(25);

//складываем все в фрагмент
const similarPhotosFragment = document.createDocumentFragment();

const createUserPhotos = () => {

  similarPhotos.forEach(({url, likes, description, comments}) => {
    const photoElement = newphotoTemplate.cloneNode(true); //клонируем шаблон
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoElement.addEventListener('click', () => {
      openFullPhoto(url, likes, comments, description);
    });

    similarPhotosFragment.append(photoElement);
  });

  document.querySelector('.pictures').append(similarPhotosFragment);
};

export {createUserPhotos};

