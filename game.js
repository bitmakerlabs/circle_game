$(document).ready(function() {
  window.game = new Game(10, 10);
  window.game.start();
});

function Circle(game) {
  this.game = game;
  this.x = Math.random() * 450;
  this.y = Math.random() * 450;
  this.diameter = 30 + Math.random() * 50;
  this.speed = 500 + Math.random() * 1500;

  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>')
      .css({
        'left': this.x,
        'top': this.y,
        'height': this.diameter,
        'width': this.diameter
      }).on('click', function(){
        _this.kill();
      });

    $('#game').append(this.$me);
  };

  this.move = function() {
    var _this = this;
    this.$me.animate({
      top: Math.random() * 450,
      left: Math.random() * 450
    }, {
      duration: this.speed,
      complete: function() {
        _this.move();
      }
    });
  };

  this.kill = function() {
    var _this = this;

    this.$me.css('background-color', 'red')
      .effect({
        effect: 'explode',
        duration: 100,
        complete: function() {
          $(this).remove();
          _this.game.increaseScore();
        },
        queue: false
    });
  };
}

Circle.init = function(game) {
  var circle = new Circle(game);
  circle.render();
  circle.move();
  return circle;
};

function Game(circleCount, duration) {
  this.score = 0;
  this.circles = [];
  this.circleCount = circleCount;
  this.duration = duration * 1000;

  this.increaseScore = function() {
    $("#score").text(this.score += 100);
  }

  this.resetScore = function() {
    $("#score").text(0);
  }

  this.start = function() {
    for (var i=0; i < this.circleCount; i++) {
      this.circles.push(Circle.init(this));
    }

    $("#score").text(this.score);
    setTimeout(this.stop.bind(this), this.duration);
  };

  this.stop = function() {
    alert("GAME OVER!");
    for (var i=0; i < this.circleCount; i++) {
      this.circles[i].$me.remove();
    }
    this.circles = [];
    this.resetScore();
  };
}
