var View = require('./view');
var Board = require('./board');

$(function () {
  var root = $('.snake-game');
  var board = new Board();
  new View(root, board);
});
