'use strict';
(function () {
  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    arr.forEach(function (item) {
      if (item > maxElement) {
        maxElement = item;
      }
    });

    return maxElement;
  };

  var getRandomElement = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  window.utilits = {
    getMaxElement: getMaxElement,
    getRandomElement: getRandomElement,
    getRandomInt: getRandomInt,
  };
})();
