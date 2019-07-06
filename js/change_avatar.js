'use strict';

(function () {
  // Initialize
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Selected DOM elements
  var setupSection = document.querySelector('.setup');
  var preview = setupSection.querySelector('.setup-user-pic');
  var mainAvatarIcon = document.querySelector('.setup-open .setup-open-icon');
  var fileUploader = setupSection.querySelector('input[type=file]');
  var form = setupSection.querySelector('.setup-wizard-form');
  var avatarLink = preview.src;

  fileUploader.addEventListener('change', function () {
    var file = fileUploader.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarLink = reader.result;
        preview.src = avatarLink;

      });

      reader.readAsDataURL(file);
    }
  });

  form.addEventListener('submit', function () {
    mainAvatarIcon.src = avatarLink;
  });
})();
