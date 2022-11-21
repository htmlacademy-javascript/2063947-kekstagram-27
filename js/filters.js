import {createUserPhotos} from './newphotos.js';
import { debounce } from './util.js';

const filterBoard = document.querySelector('.img-filters');
filterBoard.classList.remove('img-filters--inactive');

//удаление фото
const clearCurrentPhotos = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

//ПО УМОЛЧАНИЮ
const defaultButton = document.querySelector('#filter-default');
const addDefaultButtonListener = (photos) => {
  defaultButton.addEventListener('click', debounce(() => {
    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    defaultButton.classList.add('img-filters__button--active');
    clearCurrentPhotos();
    createUserPhotos(photos.slice(0, 25));
  })
  );
};

//СЛУЧАЙНЫЕ
const shuffleList = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const randomButton = document.querySelector('#filter-random');
const addRandomButtonListener = (photos) => {
  randomButton.addEventListener('click', debounce(() => {
    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    clearCurrentPhotos();
    createUserPhotos(shuffleList(photos.slice(0, 10)));
  })
  );
};

//ОБСУЖДАЕМЫЕ
const sortByCommentsAmount = (photos) =>
  photos.slice().sort((a, b) =>
    b.comments.length - a.comments.length);

const discussedButton = document.querySelector('#filter-discussed');
const addDiscussedButtonListener = (photos) => {
  discussedButton.addEventListener('click', debounce(() => {
    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
    clearCurrentPhotos();
    createUserPhotos(sortByCommentsAmount(photos));
  })
  );
};

export {addDefaultButtonListener, addRandomButtonListener, addDiscussedButtonListener};
