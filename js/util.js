const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';
  alertContainer.style.color = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement};
export {getRandomPositiveInteger};
export {isEscapeKey};
export {removeLastCharacter};
export {toNumber};
export {showAlert};
export {debounce};
