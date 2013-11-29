$(document).ready(function() {
  window.game = new Game(10, 10);
  window.game.start();
});

function Circle() {
  this.x = Math.random() * 450;
  this.y = Math.random() * 450;
  this.speed = 1000 + Math.random() * 1000;
  this.size = 30 + Math.random() * 30;
  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>');
    $(this.$me)
      .css('top', this.x)
      .css('left', this.y)
      .css('height', this.size)
      .css('width', this.size)
      .on('click', function() {
        _this.kill();
      });

    $('#game').append(this.$me);
  },
  this.move = function() {
    var _this = this;
    $(this.$me).animate({
      top: (Math.random() * 450) + "px",
      left: (Math.random() * 450) + "px"
    }, {
      complete: function() {
        _this.move();
      },
      duration: this.speed
    });
  },
  this.kill = function() {
    $(this.$me).css("background-color", "red");
    $(this.$me).effect({
      effect: "explode",
      duration: 100,
      complete: function() {
        $(this).remove();
        $("#score").text(window.game.score += 100);
    }
    });
  }
}

Circle.init = function() {
  var circle = new Circle();
  circle.render();
  circle.move();
  return circle;
}


function Game(circleCount, duration) {
  this.circleCount = circleCount;
  this.duration = duration * 1000;
  this.circles = [];
  this.score = 0;

  this.start = function() {
    $('#score').text(this.score);
    for (var i=0; i < this.circleCount; i++) {
      this.circles.push(Circle.init());
    }

    setTimeout(this.stop, this.duration);
  }

  this.stop = function() {
    alert("GAME OVER!");
    for (var i=0; i < game.circleCount; i++) {
      $(game.circles[i].$me).remove();
    }
  }
}

