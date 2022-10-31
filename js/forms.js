import {isEscapeKey} from './util.js';

//находим форму загрузки изображения
const photoLoadingButton = document.querySelector('.img-upload__input');
const photoLoadingForm = document.querySelector('.img-upload__overlay');

//находим кнопку закрытия окна загрузки изображения
const closePhotoLoadFormButton = document.querySelector('.img-upload__cancel');

//находим хэш-теги и комментарии
const hashTagInput = photoLoadingForm.querySelector('.text__hashtags');
const commentsInput = photoLoadingForm.querySelector('.text__description');

//функция закрытия формы по нажатию на Esc
const onLoadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeLoadForm();
  }};

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
  photoLoadingButton.value = ''; //сброс значения поля выбора файла
  hashTagInput.value = ''; //сброс значения поля хэш-тега
  commentsInput.value = ''; //сброс значения поля комментария
}

//обработчик события закрытия формы при нажатии на крестик
closePhotoLoadFormButton.addEventListener('click', closeLoadForm);

//ВАЛИДАЦИЯ
//находим форму для валидации
const loadingForm = document.querySelector('.img-upload__form');

//находим поле для ввода хэш-тега
const textHashtags = document.querySelector('.text__hashtags');

//создаем экземплятор валидатора поля хэш-тега
const pristine = new Pristine(loadingForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'text__hashtags--error',
});

//1 - проверка с помощью регулярного выражения (начинается с #, состоит из букв и чисел, не может состоять только из #, макс. длина 20 символов, нечувствительны к регистру)
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const checkRegExp = () => {
  const differenceSymbols = regexp.test(textHashtags.value);
  return differenceSymbols;
};

pristine.addValidator(textHashtags, checkRegExp, 'Допускаются буквы и цифры. Максимальная длина 20 символов, включая символ #. Хэш-тег должен начинаться с символа #');

//2 - проверка на разделение хэш-тегов пробелами
//определяем количество # в строке
const hashQuantity = (textHashtags.value.match(/#/g) || []).length;

//определяем количество пробелов в строке
const spaceQuantity = (textHashtags.value.match(/ /g) || []).length;

//сравниваем количество пробелов и # в строке
const checkSpaces = () => {
  const differenceSpaces = hashQuantity - spaceQuantity;
  return differenceSpaces === 1;
};

pristine.addValidator(textHashtags, checkSpaces, 'Хэш-теги должны разделяться пробелами');

//3 - проверка на повторное использование хєш-тегов
const checkDuplicates = (value) => {
  const newHashTagsArray = Array.from(new Set(value));
  for (let i = 0; i <= value.length; i++) {
    const differenceDuplicates = value.length - newHashTagsArray.length;
    return differenceDuplicates === 0;
  }};

pristine.addValidator(textHashtags, checkDuplicates, 'Один и тот же хэш-тег не может быть использован дважды');

//4 - проверка количества хэш-тегов
const checkQuantity = (value) => {
  const hashTagsArray = value.split(' ');
  return hashTagsArray.length <= 5;
};

pristine.addValidator(textHashtags, checkQuantity, 'Нельзя указать больше пяти хэш-тегов');

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
