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

  // Event handler functions
  var successHandler = function (wizards) {
    var characters = generateCharactersArray(wizards);
    var fragment = document.createDocumentFragment();
    renderWizards(canvasSelector, characters, fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
      eyesColor: eyeColor
    };
  };

  var generateCharactersArray = function (wizards) {
    var characters = [];
    wizards.forEach(function (wizard) {
      characters.push(generateCharacter(wizard.name, wizard.colorCoat, wizard.colorEyes));
    });

    return window.supportFunctions.shuffle(characters).slice(0, 4);
  };

  var renderWizards = function (canvasPlacementSelector, characters, fragment) {
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
  };

  // Runtime
  window.backend.load(successHandler, errorHandler);
})();
