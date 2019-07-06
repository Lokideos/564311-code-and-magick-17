'use strict';

(function () {
  // Initialize
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Selected DOM elements
  var setupSection = document.querySelector('.setup');
  var preview = setupSection.querySelector('.setup-user-pic');
  var mainAvatarIcon = document.querySelector('.setup-open .setup-open-icon');
  var fileUploader = setupSection.querySelector('input[type=file]');

  fileUploader.addEventListener('change', function () {
    var file = fileUploader.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        mainAvatarIcon.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
