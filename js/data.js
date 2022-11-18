import {getRandomArrayElement} from './util.js';
import {getRandomPositiveInteger} from './util.js';

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
const createComments = (commentsIndex) => ({
  id: commentsIndex + 1,
  avatar: `img/avatar-${getRandomPositiveInteger(0, AVATARS_COUNT)}.svg`,
  message: createMessages(),
  commentsName: getRandomArrayElement(COMMENTS_NAME)
});

//Функция для создания объекта с описанием фотографии
const createDescription = (descriptionIndex) => ({
  id: descriptionIndex + 1,
  url: `photos/${descriptionIndex + 1}.jpg`,
  description: description,
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from(
    {length: getRandomPositiveInteger(0, COMMENTS_COUNT)},
    (_, commentsIndex) => createComments(commentsIndex)
  )
});

//Создание 25-ти массивов и вывод в консоль
const createPhotoDescriptions = (count) =>
  Array.from({length: count}, (_, index) =>
    createDescription(index));

export {createPhotoDescriptions};
