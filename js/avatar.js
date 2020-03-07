'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var input = document.querySelector('.upload input[type=file]');
  var image = document.querySelector('.setup-user-pic');

  var changeAvatarHandler = function () {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var render = new FileReader();

      render.addEventListener('load', function () {
        image.src = render.result;
      });

      render.readAsDataURL(file);
    }
  };

  window.avatar = {
    changeAvatarHandler: changeAvatarHandler
  };
})();
