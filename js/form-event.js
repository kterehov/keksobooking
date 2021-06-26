import {storageAdForm, roomNumberToCapacity, currentTypeToPrice} from './form-variables.js';
import {validate} from './form-validation.js';

/**
 * Управление выключение элементов и селектов
 * @param {object} element
 * @param {array} values
 */
const toogleInputOptions = (element, values) => {
  const options = element.querySelectorAll('option');
  options.forEach((item) => {
    if (values.includes(item.value)) {
      if (item.hasAttribute('disabled')) {
        item.removeAttribute('disabled');
      }
      item.selected = 'selected';
    } else {
      if (item.hasAttribute('selected')) {
        item.removeAttribute('selected');
      }
      item.setAttribute('disabled', 'disabled');
    }
  });
};

/**
 * Изменение комнат и мест
 * @param {object} room
 * @param {object} capacity
 * @param {object} roomToCapacity
 */
const changeRoomNumberToCapacity = (room, capacity, roomToCapacity) => {

  if (typeof roomToCapacity[room.value] !== 'undefined') {
    toogleInputOptions(capacity, roomToCapacity[room.value]);
  } else {
    toogleInputOptions(capacity, []);
  }

};

/**
 * Изменение времени
 * @param {object} from
 * @param {object} to
 */
const changeTime = (from, to) => {
  to.value = from.querySelector('option:checked').value;
};

/**
 * Дефолтное значение у комнат - мест при загрузке страницы
 */
changeRoomNumberToCapacity(storageAdForm.el.inputAdFormRoomNumber, storageAdForm.el.inputAdFormCapacity, roomNumberToCapacity);

/**
 * Дефольное значение у цены за ночь с валидацией
 */
currentTypeToPrice();

/**
 * Эвент на зависимость между комнатами и местами
 */
storageAdForm.el.adForm.addEventListener('change', (event) => {
  if (event.target === storageAdForm.el.inputAdFormRoomNumber) {
    changeRoomNumberToCapacity(event.target, storageAdForm.el.inputAdFormCapacity, roomNumberToCapacity);
  }

  if (event.target === storageAdForm.el.inputAdFormType) {
    currentTypeToPrice();
  }

  if (event.target === storageAdForm.el.inputAdFormTimeIn) {
    changeTime(event.target, storageAdForm.el.inputAdFormTimeOut);
  }

  if (event.target === storageAdForm.el.inputAdFormTimeOut) {
    changeTime(event.target, storageAdForm.el.inputAdFormTimeIn);
  }
});

/**
 * Отправка формы
 */
storageAdForm.el.adForm.addEventListener('submit', (event) => {
  this.submit();
  event.preventDefault();
});

/**
 * Создание эвентов на валидацию и живое изменение
 */
for (const eventElement in storageAdForm.vl) {
  storageAdForm.vl[eventElement].object.addEventListener('invalid', () => {
    validate(storageAdForm.vl[eventElement], false);
  });

  storageAdForm.vl[eventElement].object.addEventListener('input', () => {
    validate(storageAdForm.vl[eventElement], true);
  });
}

