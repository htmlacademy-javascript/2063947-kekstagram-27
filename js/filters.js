import {createUserPhotos} from './newphotos.js';
import {debounce} from './util.js';

const filterBoard = document.querySelector('.img-filters');
filterBoard.classList.remove('img-filters--inactive');
const RERENDER_DELAY = 500;

//удаление фото
const clearCurrentPhotos = () => {
  const pictures = document.querySelectorAll('.picture__img');
  pictures.classList.add('hidden');
};

//ПО УМОЛЧАНИЮ
const defaultButton = document.querySelector('#filter-default');
fetch('https://27.javascript.pages.academy/kekstagram/data').then((photos) => {
  createUserPhotos(photos.slice(0, 25));
  defaultButton.addEventListener('click', () => {
    clearCurrentPhotos();
    createUserPhotos(photos.slice(0, 25))(debounce(() => createUserPhotos(photos.slice(0, 25)),
      RERENDER_DELAY,
    ));
  });
});

//СЛУЧАЙНЫЕ
const shuffleList = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const randomButton = document.querySelector('#filter-random');
fetch('https://27.javascript.pages.academy/kekstagram/data').then((photos) => {
  createUserPhotos(photos.slice(0, 10));
  randomButton.addEventListener('click', () => {
    clearCurrentPhotos();
    createUserPhotos(shuffleList(photos))(debounce(() => createUserPhotos(photos.slice(0, 25)),
      RERENDER_DELAY,
    ));
  });
});

//ОБСУЖДАЕМЫЕ
const sortByCommentsAmount = (photos) =>
  photos.slice().sort((a, b) =>
    b.comments.length - a.comments.length);

const discussedButton = document.querySelector('#filter-discussed');
fetch('https://27.javascript.pages.academy/kekstagram/data').then((photos) => {
  createUserPhotos(photos.slice(0, 25));
  discussedButton.addEventListener('click', () => {
    clearCurrentPhotos();
    createUserPhotos(sortByCommentsAmount(photos))(debounce(() => createUserPhotos(photos.slice(0, 25)),
      RERENDER_DELAY,
    ));
  });
});
