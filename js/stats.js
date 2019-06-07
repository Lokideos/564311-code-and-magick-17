'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_START_POSITION_X = 100;
var HISTOGRAM_PADDING = 20;

var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';
var FONT_COLOR = '#000';
var FONT_PROPERTIES = 'PT Mono, 16px';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, fontSettings, color) {
  ctx.fillStyle = color;
  ctx.font = fontSettings;
  ctx.fillText(text, x, y);
};

// var renderHistogramElement = function (ctx) {

// };

window.renderStatistics = function (ctx, names) {
  renderCloud(ctx, 110, 60, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_START_POSITION_X, 50, CLOUD_COLOR);

  renderText(ctx, 'Ура вы победили!', 110, 70, FONT_PROPERTIES, FONT_COLOR);
  renderText(ctx, 'Список результатов:', 110, 90, FONT_PROPERTIES, FONT_COLOR);

  for (var i = 1; i <= names.length; i++) {
    var barGapLengthX = (CLOUD_WIDTH - HISTOGRAM_PADDING * 2) / names.length;
    var histogramElementX = CLOUD_START_POSITION_X / 2 + barGapLengthX * i;
    var barWidth = barGapLengthX * 0.7;
    this.console.log(barGapLengthX * i);
    ctx.fillRect(histogramElementX, 110, barWidth, 150);

    renderText(ctx, names[i - 1], histogramElementX + barWidth / 2 - barWidth / 4, 290, FONT_PROPERTIES, FONT_COLOR);
  }
};
