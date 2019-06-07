'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_START_POSITION_X = 100;
var HISTOGRAM_PADDING = 20;
var HISTOGRAM_ELEMENT_MAX_HEIGHT = 150;
var HISTOGRAM_START_POSITION_Y = 120;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

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

var renderHistogramElement = function (ctx, maxScore, counter, names, times) {
  var barGapLengthX = (CLOUD_WIDTH - HISTOGRAM_PADDING * 2) / names.length;
  var histogramElementX = CLOUD_START_POSITION_X / 2 + barGapLengthX * (counter + 1);
  var barWidth = barGapLengthX * 0.7;
  var currentBarHeight = times[counter] / maxScore * HISTOGRAM_ELEMENT_MAX_HEIGHT;
  var currentBarStartY = histogramElementX + barWidth / 2 - barWidth / 4;

  if (names[counter] === 'Вы') {
    ctx.fillStyle = PLAYER_COLOR;
  } else {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
  }

  ctx.fillRect(
      histogramElementX, HISTOGRAM_START_POSITION_Y + HISTOGRAM_ELEMENT_MAX_HEIGHT - currentBarHeight,
      barWidth,
      currentBarHeight
  );

  renderText(
      ctx,
      names[counter],
      currentBarStartY,
      290,
      FONT_PROPERTIES,
      FONT_COLOR
  );

  renderText(
      ctx,
      Math.floor(times[counter]),
      currentBarStartY,
      HISTOGRAM_START_POSITION_Y + HISTOGRAM_ELEMENT_MAX_HEIGHT - currentBarHeight - 10,
      FONT_PROPERTIES,
      FONT_COLOR
  );
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 60, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_START_POSITION_X, 50, CLOUD_COLOR);

  renderText(ctx, 'Ура вы победили!', 110, 70, FONT_PROPERTIES, FONT_COLOR);
  renderText(ctx, 'Список результатов:', 110, 90, FONT_PROPERTIES, FONT_COLOR);

  var maxScore = times[0];

  for (var j = 1; j < times.length; j++) {
    if (maxScore < times[j]) {
      maxScore = times[j];
    }
  }

  for (var i = 0; i < names.length; i++) {
    renderHistogramElement(ctx, maxScore, i, names, times);
  }
};
