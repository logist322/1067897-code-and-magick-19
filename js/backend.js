'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var METHOD_SAVE = 'POST';
  var METHOD_LOAD = 'GET';

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var save = function (succsessHandler, errorHandler, data) {
    request(METHOD_SAVE, URL_SAVE, succsessHandler, errorHandler, data);
  };

  var load = function (succsessHandler, errorHandler) {
    request(METHOD_LOAD, URL_LOAD, succsessHandler, errorHandler);
  };

  window.backend = {
    save: save,
    load: load
  };
})();
