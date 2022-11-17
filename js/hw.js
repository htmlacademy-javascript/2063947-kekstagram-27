// //РАЗБОР ДОМАШКИ

// import {isEscapeKey} from './util.js';
// import {showAlert} from './util.js';
// import {createUserPhotos} from './newphotos.js';

// //USED
// const getData = async (onSuccess, onFail) => {
//   try {
//     const response = await fetch('https://27.javascript.pages.academy/kekstagram/data');

//     if (!response.ok) {
//       throw new Error('Не удалось загрузить фотографии');
//     }

//     const photos = await response.json();
//     onSuccess(photos);
//   } catch (error) {
//     onFail(error.message);
//   }
// };
// //

// //USED
// const sendData = async (onSuccess, onFail, body) => {
//   try {
//     const response = await fetch(
//       'https://27.javascript.pages.academy/kekstagram/',
//       {
//         method: 'POST',
//         body,
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
//     }

//     onSuccess();
//   } catch (error) {
//     onFail(error.message);
//   }
// };
// //

// //used
// const sliderElement = document.querySelector('.effect-level__slider');
// const valueElement = document.querySelector('.effect-level__value');
// valueElement.value = 100; //сброс уровня насыщенности
// const scaleInput = document.querySelector('input[name="scale"]');
// const imagePreview = document.querySelector('.img-upload__preview img');
// const loadingForm = document.querySelector('.img-upload__form');
// //

// //used
// const resetForm = () => {
//   loadingForm.reset(); //сброс полей формы
//   sliderElement.noUiSlider.set(valueElement.value); //сброс насыщенности эффекта
//   scaleInput.value = '100%'; //возврат к масштабу 100%
//   imagePreview.style.filter = ''; //возврат к эффекту Оригинал
// };
// //

// //used
// const successMessageTemplate = document
//   .querySelector('#success')
//   .content.querySelector('.success');

// const errorMessageTemplate = document
//   .querySelector('#error')
//   .content.querySelector('.error');

// const bodyElement = document.querySelector('body');
// //

// //used
// const onErrorButtonClick = () => {
//   hideMessage();
// };

// const onOverLayClick = () => {
//   hideMessage();
// };

// const onMessageEscdown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     hideMessage();
//   }
// };
// //

// const showSuccessMessage = () => {
//   const successMessageElement = successMessageTemplate.cloneNode(true);
//   document.addEventListener('keydown', onMessageEscdown);
//   document.addEventListener('click', onOverLayClick);
//   bodyElement.append(successMessageElement);
//   bodyElement.style.overflow = 'hidden';
// };

// const showErrorMessage = () => {
//   const errorMessageElement = errorMessageTemplate.cloneNode(true);
//   document.addEventListener('keydown', onMessageEscdown);
//   const errorButton = errorMessageElement.querySelector('error__button');
//   errorButton.addEventListener('click', onErrorButtonClick);
//   bodyElement.append(errorMessageElement);
//   bodyElement.style.overflow = 'hidden';
// };

// function hideMessage () {
//   const messageElement = document.querySelector('.success') || document.querySelector('.error');
//   messageElement.remove();
//   document.removeEventListener('keydown', onMessageEscdown);
//   document.removeEventListener('click', onOverLayClick);
//   bodyElement.style.overflow = 'auto';
// }

// //USED
// const onGetDataSuccess = (photos) => {
//   createUserPhotos(photos.slice(0, 25));
// };
// //

// const photoLoadingForm = document.querySelector('.img-upload__overlay');
// const submitButton = photoLoadingForm.querySelector('.img-upload__submit');

// //USED
// const blockSubmitButton = () => {
//   submitButton.disabled = true;
//   submitButton.textContent = 'Публикую...';
// };
// //

// //USED
// const unblockSubmitButton = () => {
//   submitButton.disabled = false;
//   submitButton.textContent = 'Опубликовать';
// };
// //

// //USED
// const setOnFormSubmit = (cb) => {
//   loadingForm.addEventListener('submit', async (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();
//     if (isValid) {
//       blockSubmitButton();
//       await cb(new FormData(evt.target));
//       unblockSubmitButton();
//     }
//   }

//   );
// };
// //

// //used
// const onSendDataSuccess = () => {
//   resetForm();
//   showSuccessMessage();
// };
// //

// //used
// setOnFormSubmit(async (data) => {
//   await sendData(onSendDataSuccess, showErrorMessage, data);
// });
// //

// //USED
// getData(onGetDataSuccess, showAlert);
// //
