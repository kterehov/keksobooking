/**
 * Форма объявлений
 * @type {Element}
 */
const adForm = document.querySelector('.ad-form');

/**
 * Фильтрация форма
 * @type {Element}
 */
const mapFilterForm = document.querySelector('.map__filters');

/**
 * Количество комнат
 * @type {Element}
 */
const inputAdFormRoomNumber = adForm.querySelector('#room_number');

/**
 * Количество мест
 * @type {Element}
 */
const inputAdFormCapacity = adForm.querySelector('#capacity');

/**
 * Ввод заголовка объявлений
 * @type {Element}
 */
const inputAdFormTitle = adForm.querySelector('#title');

/**
 * Ввод цены
 * @type {Element}
 */
const inputAdFormPrice = adForm.querySelector('#price');

/**
 * Тип жилья цены
 * @type {Element}
 */
const inputAdFormType = adForm.querySelector('#type');

/**
 * @type {Element}
 */
const inputAdFormTimeIn = adForm.querySelector('#timein');

/**
 * @type {Element}
 */
const inputAdFormTimeOut = adForm.querySelector('#timeout');

/**
 * Зависимость комнат и количества мест
 * @type {object}
 */
const roomNumberToCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

/**
 * Список типов валидации
 * @type {object}
 */
const validityState = {
  tooShort : 'tooShort',
  tooLong : 'tooLong',
  valueMissing : 'valueMissing',
  rangeOverflow : 'rangeOverflow',
  rangeUnderflow : 'rangeUnderflow',
};

/**
 * Зависимость типа жилья к цене
 * @type {object}
 */
const typeToPrice = {
  bungalow : 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

/**
 * Функция управления минимальной ценой от типа дома
 * @returns {int}
 */
const currentTypeToPrice = () => {
  const currentType = inputAdFormType.querySelector('option:checked');
  const currentPrice = typeToPrice[currentType.value];
  inputAdFormPrice.setAttribute('min', currentPrice);
  inputAdFormPrice.setAttribute('placeholder', currentPrice);
  return currentPrice;
};

/**
 * Форма AdForm, все объекты и валидация
 *
 * @type {object}
 */
const storageAdForm = {
  el: {
    adForm,
    inputAdFormRoomNumber,
    inputAdFormTitle,
    inputAdFormCapacity,
    inputAdFormType,
    inputAdFormTimeIn,
    inputAdFormTimeOut,
  },
  vl: {
    inputAdFormTitle: {
      'object': inputAdFormTitle,
      'rules': {
        0 : {
          'type': validityState.tooShort,
          'value': 30,
          'text': 'Ещё {value} симв.',
        },
        1 : {
          'type': validityState.tooLong,
          'value': 100,
          'text': 'Удалите лишние {value} симв.',
        },
        2 : {
          'type': validityState.valueMissing,
          'text': 'Заголовок объявления обязательное поле',
        },
      },
    },
    inputAdFormPrice: {
      'object': inputAdFormPrice,
      'rules': {
        0 : {
          'type': validityState.rangeOverflow,
          'value': 1000000,
          'text': 'Максимальная цена за ночь {value}.',
        },
        1 : {
          'type': validityState.valueMissing,
          'text': 'Цена объявления обязательное поле',
        },
        2 : {
          'type': validityState.rangeUnderflow,
          'value': currentTypeToPrice,
          'text': 'Минимальная цена за ночь {value}.',
        },
      },
    },
  },
};

export {adForm, mapFilterForm, roomNumberToCapacity, storageAdForm, validityState, typeToPrice, currentTypeToPrice};