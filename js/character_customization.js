'use strict';

(function () {
  // Initialize
  // Selected DOM elements
  var setupSection = document.querySelector('.setup');
  var form = setupSection.querySelector('.setup-wizard-form');
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

  // Support
  var getNextColor = function (colors) {
    colors.push(colors.shift());
    return colors[0];
  };

  window.supportFunctions.getPlayerColors = function () {
    return {
      coatColor: playerWizardCoat.style.fill,
      eyesColor: playerWizardEyes.style.fill || 'black'
    };
  };

  // Event handler functions
  var onPlayerWizardCoatClick = function () {
    var color = getNextColor(COAT_COLORS);
    playerWizardCoat.style.fill = color;
    playerWizardCoatInput.value = color;
    window.rendering.reRenderWizards();
  };

  var onPlayerWizardEyesClick = function () {
    var color = getNextColor(EYE_COLORS);
    playerWizardEyes.style.fill = color;
    playerWizardEyesInput.value = color;
    window.rendering.reRenderWizards();
  };

  var onPlayerWizardFireballClick = function () {
    var color = getNextColor(FIREBALL_COLORS);
    playerWizardFireball.style.background = color;
    playerWizardFireballInput.value = color;
  };

  var onSuccessHandler = function () {
    window.supportFunctions.hideElement(setupSection);
  };

  // Runtime
  var applyEventHandlers = function () {
    playerWizardCoat.addEventListener('click', onPlayerWizardCoatClick);
    playerWizardEyes.addEventListener('click', onPlayerWizardEyesClick);
    playerWizardFireball.addEventListener('click', onPlayerWizardFireballClick);
  };

  applyEventHandlers();

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessHandler, window.sharedXHRHandlers.onErrorHandler);
  });
})();
