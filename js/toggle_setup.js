'use strict';

(function () {
  // Initialization
  var setupSection = document.querySelector('.setup');
  var similarWizardsSection = document.querySelector('.setup-similar');
  var setupCloseButton = document.querySelector('.setup-close');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupOpenButtonIcon = setupOpenButton.querySelector('.setup-open-icon');
  var setupUserName = setupSection.querySelector('.setup-user-name');
  var HIDING_CLASS = 'hidden';

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

  var applyEventHandlers = function () {
    setupOpenButton.addEventListener('click', onSetupIconClick);
    setupCloseButton.addEventListener('click', onSetupCloseClick);
    setupOpenButtonIcon.addEventListener('keydown', onSetupEnterPress);
    setupCloseButton.addEventListener('keydown', onSetupCloseEnterPress);
  };

  applyEventHandlers();
})();
