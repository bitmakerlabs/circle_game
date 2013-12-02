var duration = 15
var initialCircles = 20

$(document).ready(function() {
  window.game = new Game(initialCircles, duration);
  window.game.start();
});

var newCircles = 0
function Circle() {
  this.speed = 500 + Math.random() * 1500;
  this.size = 30 + Math.random() * 70;
  this.x = Math.max(Math.random() * (600 - this.size) ,0);
  this.y = Math.max(Math.random() * (600 - this.size) ,0);
  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>');
    if (this.size > 75) {
        $(this.$me).css('background-color', "green")
      }
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
      top: Math.max(((Math.random() * (600 - this.size)) ),0) + "px",
      left: Math.max(((Math.random() * (600 - this.size)) ),0) + "px"
    }, {
      complete: function() {
        _this.move();
      },
      duration: this.speed
    });
  },
//   this.kill = function() {
//     $(this.$me).css("background-color", "red");
//     $(this.$me)
//     .effect({ 
//       effect: "explode",
//       complete: function() {
//         $(this).remove();
//         $("#score").text(window.game.score += 100);
//     }
//     });
//   }
// }


  this.kill = function() {
    $(this.$me).css("background-color", "red");  
    $(this.$me).remove();
    $("#score").text(window.game.score += Math.round(10000000 / (this.speed * this.size) ) );
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
     document.getElementById("timer").innerHTML=duration + " seconds";
    setTimeout(this.stop, this.duration);
  }

  this.stop = function() {
    $("#game").empty()
    alert("Game Over");
    // for (var i=0; i < game.circleCount; i++) {
    //   $(game.circles[i].$me).remove();
    // }
  }
}

var count = duration
var counter=setInterval(timer, 990);

function timer()
{
  count -= 1;
  if (count <= -1)
  {
     clearInterval(counter);
     //counter ended, do something here
     return;
  }
  document.getElementById("timer").innerHTML=count + " seconds";
}