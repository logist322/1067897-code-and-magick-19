'use strict';

var HEROES_NUMBER = 4;

var userNameElement = document.querySelector('.setup');
var showPopup = function () {
  userNameElement.classList.remove('hidden');
};

var heroNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var heroSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var takeRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var heroesInfo = [];

var createHeroesInfo = function () {
  for (var i = 0; i < HEROES_NUMBER; i++) {
    var currentHero = {};
    currentHero.name = takeRandomElement(heroNames) + ' ' + takeRandomElement(heroSurnames);
    currentHero.coatColor = takeRandomElement(coatColors);
    currentHero.eyesColor = takeRandomElement(eyesColors);

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

showPopup();
createHeroesInfo();
renderHeroes(heroesInfo);

