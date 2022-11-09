import {removeLastCharacter} from './util.js';
import {toNumber} from './util.js';

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
