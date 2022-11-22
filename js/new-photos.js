import {openFullPhoto} from './full-photos.js';

//находим шаблон
const newphotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//складываем все в фрагмент
const similarPhotosFragment = document.createDocumentFragment();

//отрисовка фото
const createUserPhotos = (similarPhotos) => {

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

