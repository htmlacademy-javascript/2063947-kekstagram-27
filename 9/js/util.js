//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция для получения случайного элемента массива
const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

//Функция для обработчика по нажатию Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция для удаления последнего символа в строке
function removeLastCharacter (string) {
  return string ? string.slice(0, -1) : string;
}

//Функция для приведения строки к числу
function toNumber (string) {
  return Number(string);
}


export {getRandomArrayElement};
export {getRandomPositiveInteger};
export {isEscapeKey};
export {removeLastCharacter};
export {toNumber};
