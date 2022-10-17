import {getRandomArrayElement} from './util.js';
import {getRandomPositiveInteger} from './util.js';

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

//Функция для создания сообщений (необходимо взять 1 или 2 случайных сообщения)

const createMessages = () =>
  Array.from({length: getRandomPositiveInteger(1, 2)}, () =>
    getRandomArrayElement(message)).join('.');

//Функция для создания комментария

const createComments = (index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomPositiveInteger(0, AVATARS_COUNT)}.svg`,
  message: createMessages(),
  COMMENTS_NAME: getRandomArrayElement(COMMENTS_NAME)
});

//Функция для создания объекта с описанием фотографии
const createDescription = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: description,
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from(
    {length: getRandomPositiveInteger(0, COMMENTS_COUNT)},
    (_, index) => createComments(index)
  )
});

//Создание 25-ти массивов и вывод в консоль
const createPhotoDescriptions = () =>
  Array.from({length: PICTURES_COUNT}, (_, index) =>
    createDescription(index));

export {createPhotoDescriptions};
