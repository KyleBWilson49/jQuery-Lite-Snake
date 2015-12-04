/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	var Board = __webpack_require__(2);
	
	$(function () {
	  var root = $('.snake-game');
	  var board = new Board();
	  new View(root, board);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(3);
	
	function Board () {
	  this.snake = new Snake('E');
	}
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Snake (direction) {
	  this.dir = direction;
	  this.segments = [[0,1],[0,0]];
	}
	
	Snake.prototype.move = function () {
	  var directions = {
	    N: [-1, 0],
	    S: [1, 0],
	    E: [0, 1],
	    W: [0, -1]
	  };
	
	  var head = this.segments[0];
	  var moveDir = directions[this.dir];
	  var newPos = [head[0] + moveDir[0], head[1] + moveDir[1]];
	  
	  this.segments.unshift(newPos);
	  this.segments.pop();
	};
	
	Snake.prototype.turn = function (newDirection) {
	  this.dir = newDirection;
	};
	
	module.exports = Snake;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map