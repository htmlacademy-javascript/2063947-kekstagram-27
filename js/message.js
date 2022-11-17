
import {isEscapeKey} from './util.js';
import {setUserFormSubmit} from './forms.js';
import {sendData} from './api.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
valueElement.value = 100; //сброс уровня насыщенности
const scaleInput = document.querySelector('input[name="scale"]');
const imagePreview = document.querySelector('.img-upload__preview img');
const loadingForm = document.querySelector('.img-upload__form');

const resetForm = () => {
  loadingForm.reset(); //сброс полей формы
  sliderElement.noUiSlider.set(valueElement.value); //сброс насыщенности эффекта
  scaleInput.value = '100%'; //возврат к масштабу 100%
  imagePreview.style.filter = ''; //возврат к эффекту Оригинал
};

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
  const errorButton = errorMessageElement.querySelector('error__button');
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

const onSendDataSuccess = () => {
  resetForm();
  showSuccessMessage();
};

setUserFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showErrorMessage, data);
});
