'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var HIDING_CLASS = 'hidden';

  window.supportData = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    HIDING_CLASS: HIDING_CLASS
  };

  window.supportFunctions = {
    shuffle: function (array) {
      var changedArray = array;

      for (var i = 0; i < changedArray.length; i++) {
        var randomIndex = Math.floor((Math.random() * i));
        var element = changedArray[randomIndex];

        changedArray[randomIndex] = changedArray[i];
        changedArray[i] = element;
      }

      return changedArray;
    },
    pickRandomIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    },
    showElement: function (element) {
      element.classList.remove(HIDING_CLASS);
    },
    hideElement: function (element) {
      element.classList.add(HIDING_CLASS);
    }
  };
})();
