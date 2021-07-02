import {formatAds} from './utils.js';
import {ads} from './ads.js';
import {createCard} from './card.js';
import {disableForm, enableForm} from './form.js';
import {renderMap} from './map.js';

/**
 * Дефолтный координаты
 * @type {object}
 */
const DEFAULT_COORS = {
  lat: 35.682418,
  lng: 139.753146,
  zoom: 12,
};

/**
 * Конфиг для рендера карты
 * @type {object}
 */
const mapOptions = {
  init: {
    sourceImg: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    event: {
      load: enableForm,
    },
    coordinate: DEFAULT_COORS,
  },
};

/**
 * Конфиг главного маркера
 * @type {object}
 */
const mainMarkerOptions = {
  coordinate: DEFAULT_COORS,
  options: {
    draggable: true,
    icon: {
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    },
  },
};

/**
 * Отклюфаем формы до рендера
 */
disableForm();

/**
 * Создание карты
 */
const createMapMarker = () => {
  const map = renderMap;
  map.init(L, mapOptions);
  const mainMarker = map.addMarker(mainMarkerOptions);
  map.setInputFromMarkerCoordinate('#address', mainMarker, 5);
  const configAds = formatAds(ads(20), {
    draggable: false,
    icon: {
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    },
    createCard,
  });
  map.addMarkers(configAds);
};

createMapMarker();
