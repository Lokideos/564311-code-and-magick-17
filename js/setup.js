'use strict';

// Initialization
var setupSection = document.querySelector('.setup');
var similarWizardsSection = document.querySelector('.setup-similar');
var hiddenClassSelector = 'hidden';
var canvasSelector = '.setup-similar-list';
var templateSelector = '#similar-wizard-template';
var templateFragmentSelector = '.setup-similar-item';
var wizardNameSelector = '.setup-similar-label';
var wizardCoatSelector = '.wizard-coat';
var wizardEyesSelector = '.wizard-eyes';
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
    var r = ~~(Math.random() * l);
    var o = array[r];

    array[r] = array[0];
    array[0] = o;
  }

  return array;
};

var pickRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// DOM manipulation
var showHiddenElement = function (selector, hidingClass) {
  selector.classList.remove(hidingClass);
};

var getTemplate = function (templateId, fragmentSelector) {
  return document.querySelector(templateId)
    .content
    .querySelector(fragmentSelector);
};

var renderWizards = function (canvasPlacementSelector, charactersData, fragment) {
  var canvas = document.querySelector(canvasPlacementSelector);
  charactersData.forEach(function (characterData) {
    fragment.appendChild(generateCharacterCard(
        characterData,
        templateSelector,
        templateFragmentSelector,
        wizardNameSelector,
        wizardCoatSelector,
        wizardEyesSelector
    ));
  });
  canvas.appendChild(fragment);
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
  var characters = [];
  var fullNames = generateFullNames(FIRST_NAMES, LAST_NAMES);
  for (var i = 0; i < length; i++) {
    characters.push(generateCharacter(fullNames, COAT_COLORS, EYE_COLORS));
  }

  return characters;
};

var generateCharacterCard = function (characterData, template, templateFragment, name, coat, eyes) {
  var card = getTemplate(template, templateFragment).cloneNode(true);
  card.querySelector(name).textContent = characterData.name;
  card.querySelector(coat).style.fill = characterData.coatColor;
  card.querySelector(eyes).style.fill = characterData.eyesColor;

  return card;
};

// Runtime
var setupMenuInitialize = function () {
  var charsArray = generateCharactersArray(4);
  var fragment = document.createDocumentFragment();
  renderWizards(canvasSelector, charsArray, fragment);
  showHiddenElement(setupSection, hiddenClassSelector);
  showHiddenElement(similarWizardsSection, hiddenClassSelector);
};

setupMenuInitialize();
