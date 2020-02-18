'use strict';
(function () {
  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getRandomElement = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  window.utilits = {
    getMaxElement: getMaxElement,
    getRandomElement: getRandomElement,
  };
})();
