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

//открытие полноэкранного изображения
const openFullPhoto = function(url, likes, comments, description) {
  fullPhotoContainer.classList.remove('hidden');
  fullPhotoContainer.querySelector('.big-picture__img').src = url;
  fullPhotoContainer.querySelector('.likes-count').textContent = likes;
  fullPhotoContainer.querySelector('.comments-count').textContent = comments.length;
  fullPhotoContainer.querySelector('.social__caption').textContent = description;
  commentsList.innerHTML = '';
  comments.forEach(({avatar, message, commentsName}) => createFullPhotoComments(avatar, message, commentsName));

  const counter = document.querySelector('.social__comment-count');
  const loading = document.querySelector('.comments-loader');
  counter.classList.add('hidden');
  loading.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

//закрытие окна при нажатии на Esc
function closeFullPfoto () {
  fullPhotoContainer.classList.add('hidden');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}

//закрытие окна при нажатии на крестик
closeFullPfotoButton.addEventListener('click', () => {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export {openFullPhoto};
