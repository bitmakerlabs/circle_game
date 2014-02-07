var duration = 20
var initialCircles = 20
var count = duration

$(document).ready(function() {
  window.game = new Game(initialCircles, duration);
  window.game.start();
});

var newCircles = 0
function Circle() {
  this.speed = 500 + Math.random() * 1500;
  this.size = 30 + Math.random() * 70;
  this.x = Math.max(Math.random() * (800 - this.size) ,0);
  this.y = Math.max(Math.random() * (600 - this.size) ,0);
  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>');
    $(this.$me)
      .css('top', this.y)
      .css('left', this.x)
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
    count +=1
    $(Circle.init());
    newCircles += 1;
    
    }
  };


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
     timer()
  }

  this.stop = function() {
    // $('#game').empty()
    $('#game').text('Game Over');
  }
}

var counter = setInterval(timer, 990);

function timer()
{
  $('#timer').html(count + ' seconds');
  if (count <= 0 ){ 
    window.game.stop();
    clearInterval(counter);
  }
  count -= 1;
}