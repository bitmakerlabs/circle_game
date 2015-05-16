var INITIAL_DURATION = 10; //initializes game length in seconds
var INITIAL_CIRCLES = 25;
var count = 0; //used to track time remaining

$(document).ready(function() {
  $('#hiscore').html(hiscore() || 0);
  $('#timer').html(Number(INITIAL_DURATION).toFixed(1));
  $('button').on('click', function() {
    $('#game').empty();
    window.game = new Game(INITIAL_CIRCLES, INITIAL_DURATION);
    window.game.start();
    $('button').attr("disabled", true).text("Game In Progress..");
  });
});

function Circle() {
  this.speed = 750 + Math.random() * 1000; //lower is faster
  this.size = 50 + Math.round(Math.random() * 40);
  this.x = Math.round(Math.random() * (800 - this.size));
  this.y = Math.round(Math.random() * (600 - this.size));
  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>')
      .css('top', this.y)
      .css('left', this.x)
      .css('height', this.size)
      .css('width', this.size)

      .on('mousedown', function() {
        _this.kill();
      });

    $('#game').append(this.$me);
  },
  this.move = function() {
    var _this = this;
    this.$me.animate({
      top: Math.round(Math.random() * (600 - this.size)) + 'px',
      left: Math.round(Math.random() * (800 - this.size)) + 'px'
    }, {
      complete: function() {
        _this.move();
      },
      duration: this.speed,
      easing: 'linear'
    });
  },

  this.kill = function() {
    $(this.$me).remove();
    $('#score').text(window.game.score += Math.round(10000000 / (this.speed * this.size) ) );
    count += 0.5;
    Circle.init();
  };
}

Circle.init = function() {
  var circle = new Circle();
  circle.render();
  circle.move();
  return circle;
};


function Game(circleCount, duration) {
  count += duration;
  this.circleCount = circleCount;
  this.duration = duration * 1000;
  this.circles = [];
  this.score = 0;

  this.start = function() {
    $('#score').text(this.score);
    for (var i = 0; i < this.circleCount; i++) {
      this.circles.push(Circle.init());
    }
    var counter = setInterval(timer, 100);

    function timer() {
      $('#timer').html(Number(count).toFixed(1));
      if (count <= 0.1) {
        window.game.stop();
        clearInterval(counter);
      }
      count -= 0.1;
    }
  };

  this.stop = function() {
    $('#game').text('GAME OVER');
    $('button').removeAttr("disabled").text("Start New Game");
    if (hiscore() < this.score) {
      document.cookie = "hiscore=" + this.score;
    }
    $('#hiscore').text(hiscore());
  };
}

function hiscore() {
  if (document.cookie) {
    var cookieMatches = $.grep(document.cookie.split("; "), function (e) { return /^hiscore=/.test(e) })
    if (cookieMatches.length) {
      var keyValPair = cookieMatches[0].split('=');
      if (keyValPair.length == 2) return keyValPair[1];
    }
  };
  return 0;
}