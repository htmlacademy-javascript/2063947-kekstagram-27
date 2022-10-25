const fullPhotoContainer = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');

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
};

export {openFullPhoto};
