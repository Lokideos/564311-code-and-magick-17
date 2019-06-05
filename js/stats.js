'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var cloudColor = '#fff';
var cloudShadowColor = 'rgba(0, 0, 0, 0.3)';
var fontColor = '#000';
var fontProperties = 'PT Mono, 16px';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, fontSettings, color) {
  ctx.fillStyle = color;
  ctx.font = fontSettings;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, 110, 60, cloudShadowColor);
  renderCloud(ctx, 100, 50, cloudColor);

  renderText(ctx, 'Ура вы победили!', 110, 70, fontProperties, fontColor);
  renderText(ctx, 'Список результатов:', 110, 90, fontProperties, fontColor);
};
