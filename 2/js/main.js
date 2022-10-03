//Функция, возвращающая случайное целое число из переданного диапазона включительно
//https://habr.com/ru/company/ruvds/blog/534108/
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const rndInt = randomIntFromInterval(1, 6)
console.log('Случайное целое число равно ' + rndInt)

//Функция для проверки максимальной длины строки
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length

function checkLength(str, maxlegth) {
  if (str.length <= maxlegth) {
    return true;
  } else {
    return false;
  }
}
console.log(checkLength('проверка', 20));
