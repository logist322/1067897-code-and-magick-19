'use strict';

var HERO_COUNT = 4;
var ESCAPE_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var userNameElement = document.querySelector('.setup');
var setupOpenButtonElement = document.querySelector('.setup-open');
var setupOpenImageElement = setupOpenButtonElement.querySelector('.setup-open-icon');
var setupCloseButtonElement = userNameElement.querySelector('.setup-close');
var setupSubmitElement = userNameElement.querySelector('.setup-submit');
var userFormElement = userNameElement.querySelector('.setup-wizard-form');
var usernameInputElement = userNameElement.querySelector('.setup-user-name');
var champElement = userNameElement.querySelector('.setup-player');
var champCoatElement = champElement.querySelector('.wizard-coat');
var champCoatInputElement = champElement.querySelector('input[name="coat-color"]');
var champEyesElement = champElement.querySelector('.wizard-eyes');
var champEyesInputElement = champElement.querySelector('input[name="eyes-color"]');
var champFireballElement = champElement.querySelector('.setup-fireball');
var champFireballInputElement = champElement.querySelector('input[name="fireball-color"]');

var namesHero = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnamesHero = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var heroesInfo = [];

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var createHeroesInfo = function () {
  for (var i = 0; i < HERO_COUNT; i++) {
    var currentHero = {};

    currentHero.name = getRandomElement(namesHero) + ' ' + getRandomElement(surnamesHero);
    currentHero.coatColor = getRandomElement(coatColors);
    currentHero.eyesColor = getRandomElement(eyesColors);

    heroesInfo[i] = currentHero;
  }
};

var renderHeroes = function (info) {
  var heroBlankElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < heroesInfo.length; i++) {
    var currentHeroBlankElement = heroBlankElement.cloneNode(true);

    currentHeroBlankElement.querySelector('.setup-similar-label').textContent = info[i].name;
    currentHeroBlankElement.querySelector('.wizard-coat').style.fill = info[i].coatColor;
    currentHeroBlankElement.querySelector('.wizard-eyes').style.fill = info[i].eyesColor;

    fragment.appendChild(currentHeroBlankElement);
  }

  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var showPopup = function () {
  userNameElement.classList.remove('hidden');
};

var hidePopup = function () {
  userNameElement.classList.add('hidden');
};

var rollColors = function (colors, element, property, input) {
  var lastColor = colors.pop();

  element.style[property] = lastColor;
  input.value = lastColor;
  colors.unshift(lastColor);
}

var addHandlers = function () {
  setupCloseButtonElement.addEventListener('click', hidePopupHandler);
  setupCloseButtonElement.addEventListener('keydown', hidePopupEnterHandler);
  document.addEventListener('keydown', hidePopupEscHandler);
  usernameInputElement.addEventListener('keydown', stopPropagationInputHandler);
  setupSubmitElement.addEventListener('click', submitFormHadler);
  champCoatElement.addEventListener('click', rollCoatColorHandler);
  champEyesElement.addEventListener('click', rollEyesColorHandler);
  champFireballElement.addEventListener('click', rollFireballColorHandler);
};

var removeHandlers = function () {
  setupCloseButtonElement.removeEventListener('click', hidePopupHandler);setupCloseButtonElement.removeEventListener('keydown', hidePopupEnterHandler);
  document.removeEventListener('keydown', hidePopupEscHandler);
  usernameInputElement.removeEventListener('keydown', stopPropagationInputHandler);
  setupSubmitElement.removeEventListener('click', submitFormHadler);
  champCoatElement.removeEventListener('click', rollCoatColorHandler);
  champEyesElement.removeEventListener('click', rollEyesColorHandler);
  champFireballElement.removeEventListener('click', rollFireballColorHandler);
};

var showPopupHandler = function () {
  showPopup();
  addHandlers();
};

var showPopupEnterHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    showPopup();
    addHandlers();
  }
};

var hidePopupHandler = function () {
  hidePopup();removeHandlers
};

var hidePopupEscHandler = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    hidePopup();
  }
};

var hidePopupEnterHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    hidePopup();
  }
};

var stopPropagationInputHandler = function (evt) {
  evt.stopPropagation();
};

var submitFormHadler = function () {
  userFormElement.submit();
};

var rollCoatColorHandler = function () {
  rollColors(coatColors, champCoatElement, 'fill', champCoatInputElement);
};

var rollEyesColorHandler = function () {
  rollColors(eyesColors, champEyesElement, 'fill', champEyesInputElement);
};

var rollFireballColorHandler = function () {
  rollColors(fireballColors, champFireballElement, 'background-color', champFireballInputElement);
};

setupOpenButtonElement.addEventListener('click', showPopupHandler);
setupOpenImageElement.addEventListener('keydown', showPopupEnterHandler);

createHeroesInfo();
renderHeroes(heroesInfo);

