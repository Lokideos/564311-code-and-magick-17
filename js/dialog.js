'use strict';

(function () {
  // Initialize
  var setup = document.querySelector('.setup');
  var setupHandle = document.querySelector('.upload');

  // Event handler functions
  var onSetupHandleMouseDown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      dragged = true;
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (uploadEvt) {
          uploadEvt.preventDefault();
          setupHandle.removeEventListener('click', onClickPreventDefault);
        };
        setupHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Runtime
  var applyEventHandlers = function () {
    setupHandle.addEventListener('mousedown', onSetupHandleMouseDown);
  };

  applyEventHandlers();
})();
