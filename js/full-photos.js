import {isEscapeKey} from './util.js';

const INITIAL_COMMENTS_AMOUNT = 5;
let countID = 5;

const fullPhotoContainer = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');

const fullPhoto = document.querySelector('.big-picture__preview');
const closeFullPhotoButton = fullPhoto.querySelector('.big-picture__cancel');

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
    closeFullPhoto();
  }};

const totalCounter = document.querySelector('.comments-count');
const loading = document.querySelector('.comments-loader');
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
function closeFullPhoto () {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}

//закрытие окна при нажатии на крестик
closeFullPhotoButton.addEventListener('click', closeFullPhoto);

export {openFullPhoto};
