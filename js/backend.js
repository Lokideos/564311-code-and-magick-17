'use strict';

(function () {
  var GET_WIZARDS_RESOURCE = 'https://js.dump.academy/code-and-magick/data';
  var CREATE_WIZARD_RESOURCE = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', GET_WIZARDS_RESOURCE);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('POST', CREATE_WIZARD_RESOURCE);

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            return onLoad(xhr.response);
          default:
            return onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.send(data);
    }
  };

  window.sharedXHRHandlers = {
    onErrorHandlers: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
