'use strick';

var userName = document.querySelector('.setup');
var showPopup = function () {
  userName.classList.remove('hidden');
};

var heroName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var heroSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];


var heroesNumber = 4;
var heroesInfo = [];

var createHeroesInfo = function () {
  for (var i = 0; i < heroesNumber; i++) {
    var currentHero = {};
    currentHero.name = heroName[Math.round(Math.random() * (heroName.length - 1))] + ' ' + heroSurname[Math.round(Math.random() * (heroSurname.length - 1))];
    currentHero.coatColor = coatColors[Math.round(Math.random() * (coatColors.length - 1))];
    currentHero.eyesColor = eyesColors[Math.round(Math.random() * (eyesColors.length - 1))];

    heroesInfo[i] = currentHero;
  };
};

var renderHeroes = function (info) {
  var heroBlank = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < heroesInfo.length; i++) {
    var currentHeroBlank = heroBlank.cloneNode(true);
    currentHeroBlank.querySelector('.setup-similar-label').textContent = info[i].name;
    currentHeroBlank.querySelector('.wizard-coat').style.fill = info[i].coatColor;
    currentHeroBlank.querySelector('.wizard-eyes').style.fill = info[i].eyesColor;

    console.log(currentHeroBlank);

    fragment.appendChild(currentHeroBlank);
  };

  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};

showPopup();
createHeroesInfo();
renderHeroes(heroesInfo);

