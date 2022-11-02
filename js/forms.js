import {isEscapeKey} from './util.js';

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
const openLoadForm = (evt) => {
  evt.preventDefault();
  photoLoadingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onLoadFormEscKeydown);
};

// обработчик события по нажатию на форму загрузки
photoLoadingButton.addEventListener('click', openLoadForm);

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

//валидация
loadingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

//если фокус находится в поле ввода, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
// const isInputFocused = () =>
//   document.activeElement === hashTagInput || document.activeElement === commentsInput;

//   function onLoadFormEscKeydown(evt) {
//     if (evt.key === 'Escape' && !isInputFocused()) {
//       evt.preventDefault();
//       closeLoadForm();
//     }
//   };
