'use strict';

var setupSelector = document.querySelector('.setup');

var showCharacterSetup = function (selector) {
  selector.classList.remove('hidden');
};

showCharacterSetup(setupSelector);
