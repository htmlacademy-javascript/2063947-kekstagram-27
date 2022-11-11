import {removeLastCharacter} from './util.js';
import {toNumber} from './util.js';

//изменение масштаба
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('input[name="scale"]');
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;
scaleInput.value = '100%';

zoomInButton.addEventListener('click', () => {
  const currentValue = scaleInput.value;
  const numberValue = toNumber(removeLastCharacter(currentValue));

  if (numberValue < scaleMax) {
    const newValue = numberValue + scaleStep;

    scaleInput.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
});

zoomOutButton.addEventListener('click', () => {
  const currentValue = scaleInput.value;
  const numberValue = toNumber(removeLastCharacter(currentValue));

  if (numberValue > scaleMin) {
    const newValue = numberValue - scaleStep;

    scaleInput.value = `${newValue}%`;
    imagePreview.style.transform = `scale(${newValue / 100})`;
  }
});

//применение слайдера
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const fieldsetElement = document.querySelector('.img-upload__effects');
imagePreview.classList.add('effects__preview--none'); //эффект Оригинал по умолчанию
valueElement.value = 100; //сброс уровня насыщенности

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  console.log(valueElement.value);
});

fieldsetElement.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    imagePreview.style.removeProperty('filter');
    sliderElement.noUiSlider.destroy();
  } else if (evt.target.value === 'chrome') {
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0.5,
      step: 0.1,
    });
    imagePreview.style.filter = `grayscale(${valueElement.value})`; //хром
  } else if (evt.target.value === 'sepia') {
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0.5,
      step: 0.1,
    });
    imagePreview.style.filter = `sepia(${valueElement.value})`; //сепия
  } else if (evt.target.value === 'marvin') {
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 50,
      step: 1,
    });
    imagePreview.style.filter = `invert(${valueElement.value})%`; //марвин в %
  } else if (evt.target.value === 'phobos') {
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 1.5,
      step: 0.1,
    });
    imagePreview.style.filter = `blur(${valueElement.value}px)`; //фобос в px
  } else if (evt.target.value === 'heat') {
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 2,
      step: 0.1,
    });
    imagePreview.style.filter = `brightness(${valueElement.value})`; //зной
  }
});
