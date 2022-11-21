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
sliderElement.classList.add('hidden');
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

fieldsetElement.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    imagePreview.style.filter = '';
    sliderElement.classList.add('hidden');
  } else if (evt.target.value === 'chrome') {
    sliderElement.classList.remove('hidden');
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0.5,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = `grayscale(${valueElement.value})`; //хром
    });
  } else if (evt.target.value === 'sepia') {
    sliderElement.classList.remove('hidden');
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0.5,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = `sepia(${valueElement.value})`; //сепия
    });
  } else if (evt.target.value === 'marvin') {
    sliderElement.classList.remove('hidden');
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = `invert(${valueElement.value}%)`; //марвин
    });
  } else if (evt.target.value === 'phobos') {
    sliderElement.classList.remove('hidden');
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 1.5,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = `blur(${valueElement.value}px)`; //фобос в px
    });
  } else if (evt.target.value === 'heat') {
    sliderElement.classList.remove('hidden');
    imagePreview.className = `effects__preview--${evt.target.value}`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 2,
      step: 0.1,
    });
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = `brightness(${valueElement.value})`; //зной
    });
  }
});

const resetImage = () => {
  sliderElement.noUiSlider.set(valueElement.value); //сброс насыщенности эффекта //resetImage
  imagePreview.style.transform = '';
  imagePreview.style.filter = ''; //возврат к эффекту Оригинал
  imagePreview.className = 'effects__preview--none';
  sliderElement.classList.add('hidden'); //скрываем ползунок
};

export {resetImage};
