var INITIAL_DURATION = 10; //initializes game length in seconds
var INITIAL_CIRCLES = 25;
var count = 0; //used to track time remaining

$(document).ready(function() {
  $('#hiscore').html(hiscore() || 0);
  $('#timer').html(INITIAL_DURATION);
  $('button').on('click', function() {
    window.game = new Game(INITIAL_CIRCLES, INITIAL_DURATION);
    window.game.start();
    $('button').attr("disabled", true).text("Game In Progress..");
  });
});

function Circle() {
  this.speed = 750 + Math.random() * 1500;
  this.size = 30 + Math.random() * 50;
  this.x = Math.max(Math.random() * (800 - this.size) ,0);
  this.y = Math.max(Math.random() * (600 - this.size) ,0);
  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>');
    this.$me
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
    $(this.$me).animate({
      top: Math.max(((Math.random() * (600 - this.size)) ),0) + 'px',
      left: Math.max(((Math.random() * (800 - this.size)) ),0) + 'px'
    }, {
      complete: function() {
        _this.move();
      },
      duration: this.speed
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
    var counter = setInterval(timer, 990);

    function timer() {
      $('#timer').html(Math.round(count));
      if (count <= 0) {
        window.game.stop();
        clearInterval(counter);
      }
      count -= 1;
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