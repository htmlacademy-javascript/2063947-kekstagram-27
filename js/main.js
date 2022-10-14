//Функция, возвращающая случайное целое число из переданного диапазона включительно
//https://habr.com/ru/company/ruvds/blog/534108/
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const rndInt = randomIntFromInterval()
console.log('Случайное целое число равно ' + rndInt)
//from Keks
function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
getRandomPositiveInteger ()

//Функция для проверки максимальной длины строки
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length
function checkLength(str, maxLegth) {
  if (str.length <= maxLegth) {
    return true;
  } else {
    return false;
  }
}
console.log(checkLength('проверка', 20));
//Упрощенный вариант
function checkLengthShort(str, maxLegth) {
  return str.length <= maxLegth;
}
console.log(checkLengthShort('проверка', 20));





//ДЗ Больше деталей
//1. Вводные данные

const PICTURES_COUNT = 25; //необходимо создать 25 описаний фотографий
const AVATARS_COUNT = 6; //всего есть 6 вариантов аватарок
const COMMENTS_COUNT = 10; //количество комментариев определяется самостоятельно

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]; //строка, сообщения случайные

const description = 'Фотография для Кекстаграм. Собственность Кекса. Все права защищены';
const COMMENTS_NAME = ['Alex', 'Barbara', 'Mike', 'Dilan', 'Lisa']; //строка, имена случайные

//2. Функция для определения случайного целого числа из указанного диапазона

function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//3. Функция для получения случайного элемента массива

const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

//4. Функция для создания сообщений (необходимо взять 1 или 2 случайных сообщения)

const createMessages = () =>
  Array.from({length: getRandomPositiveInteger(1, 2)}, () =>
  getRandomArrayElement(message)).join('.');

//5. Функция для создания комментария

const createComments = (index) => ({
  id: index + 1,
  avatar: 'img/avatar-${getRandomPositiveInteger(0, AVATARS_COUNT)}.svg',
  message: createMessages(),
  COMMENTS_NAME: getRandomArrayElement(COMMENTS_NAME)
});

//6. Функция для создания объекта с описанием фотографии
const createDescription = (index) => ({
  id: index + 1,
  url: 'photos/${index + 1}.jpg',
  description: description,
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from(
    {length: getRandomPositiveInteger(0, COMMENTS_COUNT)},
    (_, index) => createComments(index)
    )
});

//7. Создание 25-ти массивов и вывод в консоль
const photoDescriptions = () =>
  Array.from({length: PICTURES_COUNT}, (_, index) =>
  createDescription(index));

photoDescriptions();
