'use strict';

// Initialization
// Keycodes
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Selected DOM elements
var setupSection = document.querySelector('.setup');
var similarWizardsSection = document.querySelector('.setup-similar');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var setupOpenButtonIcon = setupOpenButton.querySelector('.setup-open-icon');
var setupUserName = setupSection.querySelector('.setup-user-name');
var setupSubmitButton = setupSection.querySelector('.setup-submit');
var setupPlayerWizard = setupSection.querySelector('.setup-player');
var setupPlayerWizardForm = setupSection.querySelector('.setup-wizard-form');
var playerWizardAppearance = setupSection.querySelector('.setup-wizard-appearance');
var playerWizardCoat = playerWizardAppearance.querySelector('.wizard-coat');
var playerWizardCoatInput = playerWizardAppearance.querySelector('input[name="coat-color"]');
var playerWizardEyes = playerWizardAppearance.querySelector('.wizard-eyes');
var playerWizardEyesInput = playerWizardAppearance.querySelector('input[name="eyes-color"]');
var playerWizardFireball = setupPlayerWizard.querySelector('.setup-fireball-wrap');
var playerWizardFireballInput = playerWizardFireball.querySelector('input[name="fireball-color"]');

// Selectors
var canvasSelector = '.setup-similar-list';
var templateSelector = '#similar-wizard-template';
var templateFragmentSelector = '.setup-similar-item';
var wizardNameSelector = '.setup-similar-label';
var wizardCoatSelector = '.wizard-coat';
var wizardEyesSelector = '.wizard-eyes';

// Mock data
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
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var HIDING_CLASS = 'hidden';

// Event handler functions
var onSetupIconClick = function () {
  showElement(setupSection);
  showElement(similarWizardsSection);

  document.addEventListener('keydown', onSetupEscPress);

};

var onSetupCloseClick = function () {
  hideElement(setupSection);
  hideElement(similarWizardsSection);

  document.removeEventListener('keydown', onSetupEscPress);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    hideElement(setupSection);
    hideElement(similarWizardsSection);

    document.removeEventListener('keydown', onSetupEscPress);
  }
};

var onSetupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showElement(setupSection);
    showElement(similarWizardsSection);

    document.addEventListener('keydown', onSetupEscPress);
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideElement(setupSection);
    hideElement(similarWizardsSection);

    document.removeEventListener('keydown', onSetupEscPress);
  }
};

var onSetupSubmitClick = function () {
  setupSubmitButton.submit();
};

var onSetupSubmitPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setupSubmitButton.submit();
  }
};

var onPlayerWizardCoatClick = function () {
  var color = getNextColor(COAT_COLORS);
  playerWizardCoat.style.fill = color;
  playerWizardCoatInput.value = color;
};

var onPlayerWizardEyesClick = function () {
  var color = getNextColor(EYE_COLORS);
  playerWizardEyes.style.fill = color;
  playerWizardEyesInput.value = color;
};

var onPlayerWizardFireballClick = function () {
  var color = getNextColor(FIREBALL_COLORS);
  playerWizardFireball.style.background = color;
  playerWizardFireballInput.value = color;
};

// Support
var getNextColor = function (colors) {
  return colors[pickRandomIndex(colors)];
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

var changeFormAction = function (form, action) {
  form.action = action;
};

var changeFormMethod = function (form, method) {
  form.method = method;
};

var changeFormContentType = function (form, contentType) {
  form.enctype = contentType;
};

// DOM manipulation
var showElement = function (element) {
  element.classList.remove(HIDING_CLASS);
};

var hideElement = function (element) {
  element.classList.add(HIDING_CLASS);
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
var generateFullNames = function (firstNames, lastNames) {
  var shuffledLastNames = shuffle(lastNames);

  return shuffle(firstNames).map(function (firstName) {
    return firstName + ' ' + shuffledLastNames.pop();
  });
};

var generateCharacter = function (names, coatColors, eyeColors) {
  return {
    name: shuffle(names).pop(),
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
  var characters = generateCharactersArray(4);
  var fragment = document.createDocumentFragment();
  renderWizards(canvasSelector, characters, fragment);
};

var applyEventHandlers = function () {
  setupOpenButton.addEventListener('click', onSetupIconClick);
  setupCloseButton.addEventListener('click', onSetupCloseClick);
  setupOpenButtonIcon.addEventListener('keydown', onSetupEnterPress);
  setupCloseButton.addEventListener('keydown', onSetupCloseEnterPress);
  setupSubmitButton.addEventListener('click', onSetupSubmitClick);
  setupSubmitButton.addEventListener('keypress', onSetupSubmitPress);
  playerWizardCoat.addEventListener('click', onPlayerWizardCoatClick);
  playerWizardEyes.addEventListener('click', onPlayerWizardEyesClick);
  playerWizardFireball.addEventListener('click', onPlayerWizardFireballClick);
};

var changeFormAttirbutes = function () {
  changeFormAction(setupPlayerWizardForm, 'https://js.dump.academy/code-and-magick');
  changeFormMethod(setupPlayerWizardForm, 'POST');
  changeFormContentType(setupPlayerWizardForm, 'multipart/form-data');
};

setupMenuInitialize();
applyEventHandlers();
changeFormAttirbutes();
