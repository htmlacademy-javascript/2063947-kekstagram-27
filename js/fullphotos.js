import {isEscapeKey} from './util.js';

const fullPhotoContainer = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');

const fullPhoto = document.querySelector('.big-picture__preview');
const closeFullPfotoButton = fullPhoto.querySelector('.big-picture__cancel');

const newCommentTemplate = document.querySelector('#picture_comment')
  .content
  .querySelector('.social__comment');

const createFullPhotoComments = function(avatar, message, commentsName) {
  const commentElement = newCommentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = commentsName;
  commentElement.querySelector('.social__text').textContent = message;

  commentsList.appendChild(commentElement);
};

const onFullPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullPfoto();
  }};

//const counter = document.querySelector('.social__comment-count');
const totalCounter = document.querySelector('.comments-count');
const loading = document.querySelector('.comments-loader');
const INITIAL_COMMENTS_AMOUNT = 5;
let countID = 5;
const currentCounter = document.querySelector('.comments-current');

//открытие полноэкранного изображения
const openFullPhoto = function(url, likes, comments, description) {
  fullPhotoContainer.classList.remove('hidden');
  fullPhotoContainer.querySelector('.big-picture__img').src = url;
  fullPhotoContainer.querySelector('.likes-count').textContent = likes;
  fullPhotoContainer.querySelector('.comments-count').textContent = comments.length;
  fullPhotoContainer.querySelector('.social__caption').textContent = description;
  commentsList.innerHTML = '';

  if (comments.length <= INITIAL_COMMENTS_AMOUNT) {
    comments.forEach(({avatar, message, commentsName}) =>
      createFullPhotoComments(avatar, message, commentsName));
    loading.classList.add('hidden');
    currentCounter.textContent = comments.length;
  } else {
    comments.slice(0, INITIAL_COMMENTS_AMOUNT).forEach(({avatar, message, commentsName}) =>
      createFullPhotoComments(avatar, message, commentsName));

    loading.addEventListener('click', (evt) => {
      evt.preventDefault();

      comments.slice(countID, countID + INITIAL_COMMENTS_AMOUNT).forEach(({avatar, message, commentsName}) =>
        createFullPhotoComments(avatar, message, commentsName));

      countID = countID + INITIAL_COMMENTS_AMOUNT;
      currentCounter.textContent = countID > comments.length ? comments.length : countID;

      if (countID >= comments.length) {
        loading.classList.add('hidden');
      }
    });
  }

  totalCounter.textContent = comments.length;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

//закрытие окна при нажатии на Esc
function closeFullPfoto () {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}

//закрытие окна при нажатии на крестик
closeFullPfotoButton.addEventListener('click', closeFullPfoto);

//ЗАГРУЗКА ДОПОЛНИТЕЛЬНЫХ КОММЕНТАРИЕВ

//функция для загрузки комментариев по 5 штук
const comment = document.querySelector('.social__comment');
const loadMoreButton = document.querySelector('.comments-loader');

window.onload = function () {
  for (let i = 5; i <= comment.length; i++) {
    comment[i].style.display = "none";
  }

  let countID = 5;
  loadMoreButton.addEventListener('click', () => {
    countID += 5;
    if (countID <= comment.length) {
      for (let i = 0; i < countID; i++) {
        comment[i].style.display = "block";
      }
    }
  });
};

/*
Код по загрузке комментариев по 5 штук нужно дописать внутри функции openFullPhoto

Код для формирования комментариев уже есть - функция createFullPhotoComments

Отображение дополнительных комментариев происходит при нажатии на кнопку .comments-loader:
- находим кнопку
- добавляем обработчик события по клику
- при нажатии на кнопку отображается не более 5 новых комментариев

***если больше 5 -- из количества нарисовать первые 5 и т.д. array.slice()

При изменении количества показанных комментариев число показанных комментариев в блоке .social__comment-count также изменяется.

Если все комментарии показаны, кнопку .comments-loader следует скрыть, добавив класс hidden:
*/

export {openFullPhoto};
