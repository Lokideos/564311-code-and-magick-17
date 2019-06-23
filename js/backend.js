'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.send();
    }
  };
})();
