'use strict';

(function () {
  // Initialize
  // Selectors
  var canvasSelector = '.setup-similar-list';
  var templateSelector = '#similar-wizard-template';
  var templateFragmentSelector = '.setup-similar-item';
  var wizardNameSelector = '.setup-similar-label';
  var wizardCoatSelector = '.wizard-coat';
  var wizardEyesSelector = '.wizard-eyes';

  // Support
  var getTemplate = function (templateId, fragmentSelector) {
    return document.querySelector(templateId)
      .content
      .querySelector(fragmentSelector);
  };

  var rateWizards = function (wizards) {
    var playerCoatColor = window.supportFunctions.getPlayerColors().coatColor;
    var playerEyesColor = window.supportFunctions.getPlayerColors().eyesColor;
    return wizards.map(function (wizard) {
      if (playerCoatColor === wizard.coatColor) {
        wizard.searchRating += 2;
      }
      if (playerEyesColor === wizard.eyesColor) {
        wizard.searchRating += 1;
      }
      return wizard;
    });
  };

  var filterWizards = function (wizards) {
    return rateWizards(wizards).sort(function (a, b) {
      var keyA = a.searchRating;
      var keyB = b.searchRating;
      if (keyA < keyB) {
        return 1;
      }
      if (keyA > keyB) {
        return -1;
      }
      return 0;
    });
  };

  // Event handler functions
  var onSuccessHandler = function (wizards) {
    var characters = generateCharactersArray(wizards);
    var fragment = document.createDocumentFragment();
    window.rendering.renderWizards(canvasSelector, characters, fragment);
  };

  // Generators
  var generateCharacterCard = function (characterData, template, templateFragment, name, coat, eyes) {
    var card = getTemplate(template, templateFragment).cloneNode(true);
    card.querySelector(name).textContent = characterData.name;
    card.querySelector(coat).style.fill = characterData.coatColor;
    card.querySelector(eyes).style.fill = characterData.eyesColor;

    return card;
  };

  var generateCharacter = function (name, coatColor, eyeColor) {
    return {
      name: name,
      coatColor: coatColor,
      eyesColor: eyeColor,
      searchRating: 0
    };
  };

  var generateCharactersArray = function (wizards) {
    var characters = [];
    wizards.forEach(function (wizard) {
      characters.push(generateCharacter(wizard.name, wizard.colorCoat, wizard.colorEyes));
    });

    return filterWizards(characters).slice(0, 4);
  };

  window.rendering = {
    renderWizards: function (canvasPlacementSelector, characters, fragment) {
      var canvas = document.querySelector(canvasPlacementSelector);
      characters.forEach(function (character) {
        fragment.appendChild(generateCharacterCard(
            character,
            templateSelector,
            templateFragmentSelector,
            wizardNameSelector,
            wizardCoatSelector,
            wizardEyesSelector
        ));
      });
      canvas.appendChild(fragment);
    }
  };

  // Runtime
  window.backend.load(onSuccessHandler, window.sharedXHRHandlers.onErrorHandler);
})();
