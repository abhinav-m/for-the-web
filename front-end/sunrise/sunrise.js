


window.setupSkeleton = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var pi = Math.PI;

    var ball = {
      x: 150,
      y: 150,
      radius: 75,
      color: 'black',
      draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath()
        ctx.strokeStyle = this.color;
        ctx.stroke();  
      },
      getRayCoordinates: function(theta, length) {
        var result = {};
        result.origX = this.x;
        result.origY = this.y;
        result.x1 = this.radius * Math.cos(theta);
        result.y1 = -(this.radius * Math.sin(theta));
        result.x2 = (this.radius + length) * Math.cos(theta);
        result.y2 = -((this.radius + length) * Math.sin(theta));
        return result;  
      }
    }

    var line = {
      draw: function(coords) {
        ctx.save();
        ctx.translate(coords.origX, coords.origY);
        ctx.beginPath();
        ctx.moveTo(coords.x1, coords.y1);
        ctx.lineTo(coords.x2,coords.y2);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

      }
    }



    function animate(){
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ball.draw();
      line.draw(ball.getRayCoordinates(pi/6,50))
      line.draw(ball.getRayCoordinates(5*pi/6,50))
      line.draw(ball.getRayCoordinates(3*pi/2,50))
    }


    animate();
}