'use strict';

(function () {
  // Initialize
  var setupSection = document.querySelector('.setup');
  var similarWizardsSection = document.querySelector('.setup-similar');
  var setupCloseButton = document.querySelector('.setup-close');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupOpenButtonIcon = setupOpenButton.querySelector('.setup-open-icon');
  var setupUserName = setupSection.querySelector('.setup-user-name');

  // DOM manipulation
  var resetSetupPosition = function () {
    setupSection.style.left = '';
    setupSection.style.top = '';
  };

  // Event handler functions
  var onSetupIconClick = function () {
    window.supportFunctions.showElement(setupSection);
    window.supportFunctions.showElement(similarWizardsSection);

    document.addEventListener('keydown', onSetupEscPress);

  };

  var onSetupCloseClick = function () {
    window.supportFunctions.hideElement(setupSection);
    window.supportFunctions.hideElement(similarWizardsSection);
    resetSetupPosition();

    document.removeEventListener('keydown', onSetupEscPress);
  };

  var onSetupEscPress = function (evt) {
    if (evt.keyCode === window.supportData.ESC_KEYCODE && document.activeElement !== setupUserName) {
      window.supportFunctions.hideElement(setupSection);
      window.supportFunctions.hideElement(similarWizardsSection);
      resetSetupPosition();

      document.removeEventListener('keydown', onSetupEscPress);
    }
  };

  var onSetupEnterPress = function (evt) {
    if (evt.keyCode === window.supportData.ENTER_KEYCODE) {
      window.supportFunctions.showElement(setupSection);
      window.supportFunctions.showElement(similarWizardsSection);

      document.addEventListener('keydown', onSetupEscPress);
    }
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === window.supportData.ENTER_KEYCODE) {
      window.supportFunctions.hideElement(setupSection);
      window.supportFunctions.hideElement(similarWizardsSection);
      resetSetupPosition();

      document.removeEventListener('keydown', onSetupEscPress);
    }
  };

  // Runtime
  var applyEventHandlers = function () {
    setupOpenButton.addEventListener('click', onSetupIconClick);
    setupCloseButton.addEventListener('click', onSetupCloseClick);
    setupOpenButtonIcon.addEventListener('keydown', onSetupEnterPress);
    setupCloseButton.addEventListener('keydown', onSetupCloseEnterPress);
  };

  applyEventHandlers();
})();
