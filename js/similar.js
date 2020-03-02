'use strict';

(function () {
  var currentColorCoat = document.querySelector('input[name="coat-color"]');
  var currentColorEyes = document.querySelector('input[name="eyes-color"]');

  var getRank = function (hero) {
    var rank = 0;

    if (hero.colorCoat === currentColorCoat.value) {
      rank += 2;
    }

    if (hero.colorEyes === currentColorEyes.value) {
      rank++;
    }

    return rank;
  };

  var show = window.debounce(function (heroes) {
    var heroesCopy = heroes.slice();

    heroesCopy.sort(function (left, right) {
      var diff = getRank(right) - getRank(left);

      if (!diff) {
        if (left.name > right.name) {
          return 1;
        } else if (left.name < right.name) {
          return -1;
        }

        return 0;
      }

      return diff;
    });

    window.setup.renderHeroes(heroesCopy);
  });

  window.similar = {
    show: show
  };
})();
