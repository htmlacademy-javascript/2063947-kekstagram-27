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

//Функция для проверки максимальной длины строки (упрощенный вариант)

function checkLengthShort(str, maxLegth) {
  return str.length <= maxLegth;
}
console.log(checkLengthShort('проверка', 20));

//ДЗ Больше деталей
/*Новый объект должен выглядеть так:
  newObj = {
    ID: 1,
    URL: 'photos/8.jpg',
    DESCRIPTION: 'Фотография для Кекстаграм. Собственность Кекса. Все права защищены',
    LIKES: 117,
    COMMENTS: [4, 'img/avatar-6.svg', 'Всё отлично!', 'Dilan']
  }
*/

//1. Обозначение и ввод данных

let ID; //число (1, 25), не должно повторяться
let URL; //число (1, 25), не должно повторяться, строка - адрес картинки вида photos/{{i}}.jpg
const DESCRIPTION = 'Фотография для Кекстаграм. Собственность Кекса. Все права защищены';
let LIKES; //случайное число (15, 200)
let COMMENTS = [commentsID, avatar, message, commentsName]; //массив, количество определяем самостоятельно, комментарии генерируются случайным образом
let commentsID; //случайное число (1, 5), не должно повторяться
let avatar; //число (1, 6), строка - img/avatar-{{случайное число от 1 до 6}}.svg
let message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]; //случайное число (1, 5), строка
let commentsName = [
  'Alex',
  'Barbara',
  'Mike',
  'Dilan',
  'Lisa'
]; //строка, имена случайные

//2. Функция для создания объекта с описанием фотографии
const createDescription = (indexID, indexURL) => {
  let commentsID = getRandomPositiveInteger(1, 6); //случайное число (1, 5), не должно повторяться
  let avatar = getRandomPositiveInteger(1, 6);
  let randomMessageIndex = getRandomPositiveInteger(0, message.length - 1);
  let message = message[randomMessageIndex];
  let randomNameIndex = getRandomPositiveInteger(0, commentsName.length - 1);
  let commentsName = commentsName[randomNameIndex];

  return {
    id: indexID,
    url: 'photos/' + indexURL + '.jpg',
    description: DESCRIPTION,
    likes: getRandomPositiveInteger(15, 200),
    comments: [
      commentsID,
      avatar,
      message,
      commentsName
    ]
  }
};

//3. Создание 25-ти массивов и вывод в консоль
const photoDescriptions = Array.from({length: 25}, (element, index) =>
createDescription(indexID, indexURL, indexComments));

console.log(photoDescriptions);

