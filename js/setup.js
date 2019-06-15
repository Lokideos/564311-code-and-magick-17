'use strict';

// Initialization
var setupSelector = document.querySelector('.setup');
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Support
var shuffle = function (array) {
  var l = array.length + 1;
  while (l--) {
    // eslint-disable-next-line one-var
    var r = ~~(Math.random() * l),
      o = array[r];

    array[r] = array[0];
    array[0] = o;
  }

  return array;
};

var pickRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// DOM manipulation
var showCharacterSetup = function (selector) {
  selector.classList.remove('hidden');
};

// Generators
var generateFullNames = function (firstNamesArray, lastNamesArray) {
  lastNamesArray = shuffle(lastNamesArray);
  return shuffle(firstNamesArray.map(function (firstName) {
    return firstName + ' ' + lastNamesArray.pop();
  }
  ));
};

var generateCharacter = function (names, coatColors, eyeColors) {
  return {
    name: names[pickRandomIndex(names)],
    coatColor: coatColors[pickRandomIndex(coatColors)],
    eyesColor: eyeColors[pickRandomIndex(eyeColors)]
  };
};

var generateCharactersArray = function (length) {
  var arr = [];
  var fullNames = generateFullNames(FIRST_NAMES, LAST_NAMES);
  for (var i = 0; i < length; i++) {
    arr.push(generateCharacter(fullNames, COAT_COLORS, EYE_COLORS));
  }
  return arr;
};

showCharacterSetup(setupSelector);
generateCharactersArray(4);
