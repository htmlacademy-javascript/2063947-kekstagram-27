import {isEscapeKey} from './util.js';

//находим форму загрузки изображения
const photoLoadingButton = document.querySelector('.img-upload__input');
const photoLoadingForm = document.querySelector('.img-upload__overlay');

//находим кнопку закрытия окна загрузки изображения
const closePhotoLoadFormButton = document.querySelector('.img-upload__cancel');

//находим хэш-теги и комментарии
const hashTagInput = photoLoadingForm.querySelector('.text__hashtags');
const commentsInput = photoLoadingForm.querySelector('.text__description');

//открытие формы загрузки изображения
const openLoadForm = (evt) => {
  evt.preventDefault();
  photoLoadingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// обработчик события по нажатию на форму загрузки
photoLoadingButton.addEventListener('click', openLoadForm);

//функция закрытия формы по нажатию на Esc
const onLoadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeLoadForm();
  }};

//обработчик события закрытия формы по нажатию на Esc
function closeLoadForm () {
  photoLoadingForm.classList.add('.hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onLoadFormEscKeydown);
  photoLoadingButton.value = ''; //сброс значения поля выбора файла
  hashTagInput.value = ''; //сброс значения поля хэш-тега
  commentsInput.value = ''; //сброс значения поля комментария
}

//обработчик события закрытия формы при нажатии на крестик
closePhotoLoadFormButton.addEventListener('click', closeLoadForm);

//находим форму для валидации
const loadingForm = document.querySelector('.img-upload__form');

//создаем экземплятор валидатора поля хэш-тега
const pristineHashTag = new Pristine(loadingForm, {
  classTo: 'text__hashtags',
  errorTextParent: 'text__hashtags',
  //errorTextClass: '',
});

//создаем экземплятор валидатора поля комментария
const pristineComments = new Pristine(loadingForm, {
  classTo: 'text__hashtags',
  errorTextParent: 'text__hashtags',
  //errorTextClass: '',
});

//валидация хэш-тегов
loadingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidHashTag = pristineHashTag.validate();
  if (isValidHashTag) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

//валидация комментариев
loadingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValidComments = pristineComments.validate();
  if (isValidComments) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
