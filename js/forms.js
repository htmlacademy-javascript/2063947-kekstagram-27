import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {resetImage} from './slider.js';

//находим форму загрузки и редактирования изображения
const photoLoadingButton = document.querySelector('.img-upload__input');
const photoLoadingForm = document.querySelector('.img-upload__overlay');

//находим кнопку закрытия окна загрузки изображения
const closePhotoLoadFormButton = document.querySelector('.img-upload__cancel');

//находим хэш-теги и комментарии
const hashTagInput = photoLoadingForm.querySelector('.text__hashtags');
const commentsInput = photoLoadingForm.querySelector('.text__description');

const isInputFocused = () =>
  document.activeElement === hashTagInput || document.activeElement === commentsInput;

//функция закрытия формы по нажатию на Esc
const onLoadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFocused()) {
    closeLoadForm();
  }
};

//открытие формы загрузки изображения
const openLoadForm = () => {
  photoLoadingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onLoadFormEscKeydown);
};

// обработчик события по нажатию на форму загрузки
photoLoadingButton.addEventListener('change', openLoadForm);

//обработчик события закрытия формы по нажатию на Esc
function closeLoadForm () {
  photoLoadingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onLoadFormEscKeydown);
  photoLoadingButton.value = '';
  hashTagInput.value = '';
  commentsInput.value = '';
}

//обработчик события закрытия формы при нажатии на крестик
closePhotoLoadFormButton.addEventListener('click', closeLoadForm);

//ВАЛИДАЦИЯ
//находим форму для валидации
const loadingForm = document.querySelector('.img-upload__form');

//создаем экземплятор валидатора поля хэш-тега
const pristine = new Pristine(loadingForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text--error',
});

//1 - проверка с помощью регулярного выражения (начинается с #, состоит из букв и чисел, не может состоять только из #, макс. длина 20 символов, нечувствительны к регистру)
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const checkRegExp = (value) => {

  const hashTagsArray = value.split(' ');
  return hashTagsArray.every((hashTag) => regexp.test(hashTag));
};

pristine.addValidator(hashTagInput, checkRegExp, 'Допускаются буквы и цифры. Максимальная длина 20 символов, включая символ #. Хэш-тег должен начинаться с символа #');

//2 - проверка на разделение хэш-тегов пробелами
const checkSpaces = (value) => {
  const hashQuantity = (value.match(/#/g) || []).length;
  const spaceQuantity = (value.match(/ /g) || []).length;
  const differenceSpaces = hashQuantity - spaceQuantity;
  return differenceSpaces === 1;
};

pristine.addValidator(hashTagInput, checkSpaces, 'Хэш-теги должны разделяться пробелами');

//3 - проверка на повторное использование хєш-тегов
const checkDuplicates = (value) => {
  const hashTagsArray = value.split(' ');
  const hashTagsSet = new Set(hashTagsArray);
  return hashTagsArray.length === hashTagsSet.size;
};

pristine.addValidator(hashTagInput, checkDuplicates, 'Один и тот же хэш-тег не может быть использован дважды');

//4 - проверка количества хэш-тегов
const checkQuantity = (value) => {
  const hashTagsArray = value.split(' ');
  return hashTagsArray.length <= 5;
};

pristine.addValidator(hashTagInput, checkQuantity, 'Нельзя указать больше пяти хэш-тегов');

//5 - проверка количества символов в поле ввода комментария
const checkCommentsLength = (comment) => comment.length <= 140;

pristine.addValidator(commentsInput, checkCommentsLength, 'Длина комментария не больше 140 символов');

//отправка формы

const submitButton = photoLoadingForm.querySelector('.img-upload__submit');
//const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const scaleInput = document.querySelector('input[name="scale"]');
//const imagePreview = document.querySelector('.img-upload__preview img');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  loadingForm.reset(); //сброс полей формы
  valueElement.value = 50; //сброс уровня насыщенности
  scaleInput.value = '100%'; //возврат к масштабу 100%
  resetImage();
};

const setUserFormSubmit = (onSuccess) => {
  loadingForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessMessage();
          resetForm();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

//закрытие формы при нажатии Опубликовать
setUserFormSubmit(closeLoadForm);

export {setUserFormSubmit, closeLoadForm};
