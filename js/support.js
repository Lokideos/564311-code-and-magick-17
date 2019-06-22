'use strict';

var getNextColor = function (colors) {
  colors.push(colors.shift());
  return colors[0];
};

var shuffle = function (array) {
  var changedArray = array;

  for (var i = 0; i < changedArray.length; i++) {
    var randomIndex = Math.floor((Math.random() * i));
    var element = changedArray[randomIndex];

    changedArray[randomIndex] = changedArray[i];
    changedArray[i] = element;
  }

  return changedArray;
};

var pickRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.support = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
