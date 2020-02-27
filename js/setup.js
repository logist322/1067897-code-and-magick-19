'use strict';

(function () {
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

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var heroesInfo = [];

  var getUniqueIndex = function (array) {
    var index = Math.round( Math.random() * (heroesInfo.length - 1));

    for (var j = 0; j < array.length; j++) {
      if (index === array[j]) {
        getUniqueIndex(array)
      }
    }
    array.push(index);
    return index;
  };

  var renderHeroes = function (info) {
    var heroBlankElement = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var fragment = document.createDocumentFragment();
    var takenIndex = [];

    for (var i = 0; i < HERO_COUNT; i++) {
      var currentIndex = getUniqueIndex(takenIndex);
      var currentHeroBlankElement = heroBlankElement.cloneNode(true);

      currentHeroBlankElement.querySelector('.setup-similar-label').textContent = info[currentIndex].name;
      currentHeroBlankElement.querySelector('.wizard-coat').style.fill = info[currentIndex].colorCoat;
      currentHeroBlankElement.querySelector('.wizard-eyes').style.fill = info[currentIndex].colorEyes;

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
  };

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
    setupCloseButtonElement.removeEventListener('click', hidePopupHandler);
    setupCloseButtonElement.removeEventListener('keydown', hidePopupEnterHandler);
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
    hidePopup();
    removeHandlers();

    userNameElement.style.top = '80px';
    userNameElement.style.left = '50%';
  };

  var hidePopupEscHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      hidePopup();
      removeHandlers();

      userNameElement.style.top = '80px';
      userNameElement.style.left = '50%';
    }
  };

  var hidePopupEnterHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      hidePopup();
      removeHandlers();

      userNameElement.style.top = '80px';
      userNameElement.style.left = '50%';
    }
  };

  var stopPropagationInputHandler = function (evt) {
    evt.stopPropagation();
  };

  var saveSuccsessHandler = function () {
    hidePopup();
    removeHandlers();

    userNameElement.style.top = '80px';
    userNameElement.style.left = '50%';
  };

  var saveErrorHandler = function (response) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = response;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var submitFormHadler = function (evt) {
    window.backend.save(new FormData(userFormElement), saveSuccsessHandler, saveErrorHandler);

    evt.preventDefault();
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


  var loadSuccessHandler = function (infoserv) {
    heroesInfo = infoserv;
    renderHeroes(heroesInfo);
  };

  var loadErrorHandler = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = 'Error';
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);
})();
