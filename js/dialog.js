'use strict';

(function () {
  var dialogAvatarElement = document.querySelector('.upload');

  dialogAvatarElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var setupElement = document.querySelector('.setup');

    var coordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragger = false;

    var moveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragger = true;

      var shift = {
        x: coordinates.x - moveEvt.clientX,
        y: coordinates.y - moveEvt.clientY
      };

      coordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    };

    var upHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);

      if (dragger) {
        var clickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          dialogAvatarElement.removeEventListener('click', clickHandler);
        };

        dialogAvatarElement.addEventListener('click', clickHandler);
      }
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  });
})();
