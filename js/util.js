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

/*//Функция для проверки максимальной длины строки
function checkLengthShort(str, maxLegth) {
  return str.length <= maxLegth;
}
checkLengthShort();
*/

export {getRandomArrayElement};
export {getRandomPositiveInteger};
export {isEscapeKey};
