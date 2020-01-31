'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHIFT = 10;
var PADDING = 20;
var FONT_SIZE = 16;
var FONT_FAMILY = 'PT Mono';
var TEXT_COLOR = '#000';
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;
var COLUMN_COLOR = 'rgb(255, 0, 0)';
var COLUMN_SPACE = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHIFT, CLOUD_Y + SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_SIZE);

  var maxElement = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
    ctx.fillText(names[i], CLOUD_X + PADDING + COLUMN_WIDTH / 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - PADDING - FONT_SIZE);
    ctx.fillText(Math.round(times[i]), CLOUD_X + PADDING + COLUMN_WIDTH / 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - PADDING - FONT_SIZE * 2 - COLUMN_SPACE - COLUMN_HEIGHT * times[i] / maxElement);

    if (names[i] === 'Вы') {
      ctx.fillStyle = COLUMN_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(CLOUD_X + PADDING + COLUMN_WIDTH / 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - PADDING - FONT_SIZE - COLUMN_SPACE - COLUMN_HEIGHT * times[i] / maxElement, COLUMN_WIDTH, COLUMN_HEIGHT * times[i] / maxElement);
  }
};
