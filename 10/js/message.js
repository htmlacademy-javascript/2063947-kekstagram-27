import {isEscapeKey} from './util.js';

const successMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const bodyElement = document.querySelector('body');

const onErrorButtonClick = () => {
  hideMessage();
};

const onOverLayClick = () => {
  hideMessage();
};

const onMessageEscdown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscdown);
  document.addEventListener('click', onOverLayClick);
  bodyElement.append(successMessageElement);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscdown);
  const errorButton = errorMessageElement.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  bodyElement.append(errorMessageElement);
  bodyElement.style.overflow = 'hidden';
};

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscdown);
  document.removeEventListener('click', onOverLayClick);
  bodyElement.style.overflow = 'auto';
}

export {showSuccessMessage, showErrorMessage};
