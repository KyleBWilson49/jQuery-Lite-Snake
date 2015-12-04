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
