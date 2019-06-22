'use strict';

// Initialization
// Selected DOM elements
var setupSection = document.querySelector('.setup');
var similarWizardsSection = document.querySelector('.setup-similar');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var setupOpenButtonIcon = setupOpenButton.querySelector('.setup-open-icon');
var setupUserName = setupSection.querySelector('.setup-user-name');
var setupPlayerWizard = setupSection.querySelector('.setup-player');
var playerWizardAppearance = setupSection.querySelector('.setup-wizard-appearance');
var playerWizardCoat = playerWizardAppearance.querySelector('.wizard-coat');
var playerWizardCoatInput = playerWizardAppearance.querySelector('input[name="coat-color"]');
var playerWizardEyes = playerWizardAppearance.querySelector('.wizard-eyes');
var playerWizardEyesInput = playerWizardAppearance.querySelector('input[name="eyes-color"]');
var playerWizardFireball = setupPlayerWizard.querySelector('.setup-fireball-wrap');
var playerWizardFireballInput = playerWizardFireball.querySelector('input[name="fireball-color"]');

// Mock data
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
  resetSetupPosition();

  document.removeEventListener('keydown', onSetupEscPress);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === window.support.ESC_KEYCODE && document.activeElement !== setupUserName) {
    hideElement(setupSection);
    hideElement(similarWizardsSection);
    resetSetupPosition();

    document.removeEventListener('keydown', onSetupEscPress);
  }
};

var onSetupEnterPress = function (evt) {
  if (evt.keyCode === window.support.ENTER_KEYCODE) {
    showElement(setupSection);
    showElement(similarWizardsSection);

    document.addEventListener('keydown', onSetupEscPress);
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === window.support.ENTER_KEYCODE) {
    hideElement(setupSection);
    hideElement(similarWizardsSection);
    resetSetupPosition();

    document.removeEventListener('keydown', onSetupEscPress);
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

// DOM manipulation
var showElement = function (element) {
  element.classList.remove(HIDING_CLASS);
};

var hideElement = function (element) {
  element.classList.add(HIDING_CLASS);
};

var resetSetupPosition = function () {
  setupSection.style.left = '';
  setupSection.style.top = '';
};

// Runtime

var applyEventHandlers = function () {
  setupOpenButton.addEventListener('click', onSetupIconClick);
  setupCloseButton.addEventListener('click', onSetupCloseClick);
  setupOpenButtonIcon.addEventListener('keydown', onSetupEnterPress);
  setupCloseButton.addEventListener('keydown', onSetupCloseEnterPress);
  applyChooseColorHandlers();
};

var applyChooseColorHandlers = function () {
  playerWizardCoat.addEventListener('click', onPlayerWizardCoatClick);
  playerWizardEyes.addEventListener('click', onPlayerWizardEyesClick);
  playerWizardFireball.addEventListener('click', onPlayerWizardFireballClick);
};

applyEventHandlers();
