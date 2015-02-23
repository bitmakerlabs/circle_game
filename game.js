var Circle = function(e) {
  this.element = e;
  this.diameter = 30 + Math.random() * 50;
  this.speed = 500 + Math.random() * 1500;

  this.element.css({
    width: this.diameter,
    height: this.diameter,
    top: this.newPosition(),
    left: this.newPosition()
  });
};

Circle.prototype.newPosition = function() {
  return Math.random() * (500 - this.diameter);
}

Circle.prototype.listen = function() {
  var that = this;
  this.element.on('click', function(e) {
    that.kill();
  });
}

Circle.prototype.move = function() {
  var that = this;
  this.element.animate({
      top: this.newPosition(),
      left: this.newPosition()
    }, {
      duration: this.speed,
      complete: function() {
        that.move();
      }
    });
}

Circle.prototype.kill = function() {
  this.element.css('background-color', 'red')
    .effect({
      effect: 'explode',
      duration: 150,
      complete: function() {
        window.score.increase();
        $(this).off('click');
      },
      queue: false
    });
}

var Score = function(e) {
  this.element = e;
};

Score.prototype.current = function() {
  return this.element.html();
}

Score.prototype.reset = function() {
  this.element.html(0);
};

Score.prototype.increase = function() {
  var newScore = parseInt(this.current()) + 100;
  this.element.html(newScore);
};

$(document).ready(function() {
  var duration = 10000; // 10 seconds
  window.score = new Score($('#score'));
  window.score.reset();

  $.each($('.circle'), function() {
    var circle = new Circle($(this));
    circle.listen();
    circle.move();
  });

  setTimeout(function() {
    alert("GAME OVER: refresh page to start again");
    $.each($('.circle'), function() {
      $(this).off('click');
      $(this).hide();
    });
  }, duration);
});
