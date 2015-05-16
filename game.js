var INITIAL_DURATION = 10; //initializes game length in seconds
var INITIAL_CIRCLES = 25;
var timeLeft = 0;
var gamePaused = false;
var gameRunning = false;

$(document).ready(function() {
  $('#hiscore').html(hiscore() || 0);
  $('#timer').html(Number(INITIAL_DURATION).toFixed(1));
  $('button').on('click', function() {
    gameStateManager();
  });
});

function gameStateManager() {
  if (gameRunning === false) {
    $('#game').empty();
      window.game = new Game(INITIAL_CIRCLES, INITIAL_DURATION);
      window.game.start();
    } else {
      window.game.pause();
  }
}

function Circle() {
  this.speed = 750 + Math.random() * 1000; //lower is faster
  this.diameter = 50 + Math.round(Math.random() * 40);
  this.x = Math.round(Math.random() * (800 - this.diameter));
  this.y = Math.round(Math.random() * (600 - this.diameter));
  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>')
      .css('top', this.y)
      .css('left', this.x)
      .css('height', this.diameter)
      .css('width', this.diameter)

      .on('mousedown', function() {
        _this.kill();
      });

    $('#game').append(this.$me);
  },
  this.move = function() {
    var _this = this;
    this.$me.animate({
      top: Math.round(Math.random() * (600 - this.diameter)) + 'px',
      left: Math.round(Math.random() * (800 - this.diameter)) + 'px'
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
    $('#score').text(window.game.score += Math.round(10000000 / (this.speed * this.diameter) ) );
    timeLeft += 0.5;
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
  timeLeft += duration;
  this.circleCount = circleCount;
  this.duration = duration * 1000;
  this.circles = [];
  this.score = 0;

  this.start = function() {
    gameRunning = true;
    $('button').text("--  Pause  --");
    $('#score').text(this.score);
    for (var i = 0; i < this.circleCount; i++) {
      this.circles.push(Circle.init());
    }
    var counter = setInterval(timer, 100);

    function timer() {
      $('#timer').html(Number(timeLeft).toFixed(1));
      if (timeLeft <= 0.1 ) {
        window.game.stop();
        clearInterval(counter);
      }
      if (gamePaused === false) {
        timeLeft -= 0.1;
      }
    }
  };

  this.pause = function() {
    gamePaused = !gamePaused;
    $('.circle').toggle();
    if (gamePaused === true) {
      $('button').text("--  Continue  --");
    } else {
      $('button').text("--   Pause  --");
    }
  };

  this.stop = function() {
    gameRunning = false;
    $('#game').text('GAME OVER');
    $('button').text("Start New Game");
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

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 32: //spacebar
      gameStateManager();
    break;
  }
};