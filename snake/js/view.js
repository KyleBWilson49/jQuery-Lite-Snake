function View ($el, board) {
  this.$el = $el;
  this.board = board;
  this.setupBoard();
  this.bindEvents();
  this.runGame();
}

View.prototype.bindEvents = function () {
  var view = this;
  document.onkeypress = function (e) {
    view.handleKeyPress(e);
  };
};

View.prototype.setupBoard = function () {
  var $board = $('<ul>');

  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 20; col++) {
      var $square = $('<li>').data('pos', row + ',' + col);
      $board.append($square);
    }
  }

  this.$el.append($board);
};

View.prototype.handleKeyPress = function(e) {
  var directions = {
    119: 'N',
    115: 'S',
    97: 'W',
    100: 'E'
  };
  var key = e.which;
  this.board.snake.turn(directions[key]);
};

View.prototype.runGame = function () {
  var view = this;
  setInterval(function () {
    view.takeTurn();
  }, 500);
};

View.prototype.takeTurn = function () {
  this.board.snake.move();
  this.drawBoard();
};

View.prototype.drawBoard = function () {
  var oldSnakes = [].slice.call($('.snake'));
  oldSnakes.forEach(function (el) {
    $(el).removeClass('snake');
  });

  var currentSnake = this.board.snake.segments;
  var squares =[].slice.call($('li'));

  squares.forEach(function (square) {
    currentSnake.forEach(function (pos) {
      if (pos.toString() == $(square).data('pos')) {
        $(square).addClass('snake');
      }
    });
  });
};

module.exports = View;
