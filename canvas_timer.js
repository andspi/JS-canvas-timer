/* This JS script calls a loop upon request, which controls the timer.
   The timer controls the scripted drawing of an oldschool stopwatch like animation in the selected html canvas.
   Because I am still a beginner, this file is heavily annotated, so the intended function of the various parts is clarified.
*/
// Set Time
var countDown = 300; // 300 = 30 seconds

/*
// Animation Loop
function mainLoop(tStart) {
    var stopLoop = window.requestAnimationFrame( gameLoop );
    if (!tLast) { var tLast = 0 };
    if (!iFrame) { var iFrame = 0 };
    // Draw background


    if (tStart > (tLast + 100)){ // 10 Hz
      iFrame++;
      // check if its over
      if ( countDown.value <= 0 ) {   // End Round
          window.cancelAnimationFrame( stopLoop );
      } else {
      // Decrease countdown
        countDown--;
        // calculate digit
        var digit = new Path2D();

        // draw digit
        ctx.fill(digit);
      }
    };
} // End Loop
*/

// Select the <canvas> element in the html file:
var timerCanvas = document.getElementById('timercanvas');
var ctx = timerCanvas.getContext('2d');

// canvas grid
/* for (var i = 1; i <= 20; i++) {
  if (i % 5 === 0) {
    ctx.strokeStyle = "aqua";
  } else {
    ctx.strokeStyle = "cornflowerblue";
  }
  ctx.beginPath();
  ctx.moveTo(i * 10, 0);
  ctx.lineTo(i * 10, 200);
  ctx.stroke();
  ctx.moveTo(0, i * 10);
  ctx.lineTo(200, i * 10);
  ctx.stroke();
} */

// draw background
ctx.beginPath();
ctx.arc(100,120,60,0,2 * Math.PI ,false);
ctx.fillStyle = "slategrey";
ctx.fill();

ctx.beginPath();
ctx.arc(100,120,58,0,2 * Math.PI ,false);
ctx.fillStyle = "whitesmoke";
ctx.fill();

ctx.beginPath();
ctx.arc(100,120,52,0,2 * Math.PI ,false);
ctx.fillStyle = "silver";
ctx.fill();
ctx.strokeStyle = "black";
ctx.lineWidth = "0";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(90,85);
ctx.rect(93,48,14,15);

ctx.fillStyle = "silver";
ctx.fill();

ctx.beginPath();
ctx.arc(100,30,20,0,2 * Math.PI ,false);
ctx.fillStyle = "silver";
ctx.fill();
ctx.strokeStyle = "slategrey";
ctx.lineWidth = "0";
ctx.stroke();

ctx.beginPath();
ctx.globalCompositeOperation = "xor";
ctx.arc(100,30,13,0,2 * Math.PI ,false);
ctx.fill();
ctx.globalCompositeOperation = "source-over";
ctx.strokeStyle = "dimgrey";
ctx.lineWidth = "0";
ctx.stroke();

var elements = Math.floor( countDown / 10);
for (var i = 0; i <= elements ; i++) {
  if (i % 5 === 0) {
    ctx.strokeStyle = "dimgrey";
    ctx.lineWidth = "2";
  } else {
    ctx.strokeStyle = "darkgrey";
    ctx.lineWidth = "0";
  }
  ctx.beginPath();
  ctx.moveTo(100,120);
  var startAngle = -(Math.PI * 1/2) + i * (Math.PI*2/elements);
  var stopAngle = -(Math.PI * 1/2) + (i + 0.05) * (Math.PI*2/elements);
  ctx.arc(100,120,48,startAngle,stopAngle,false);
  ctx.stroke();
}

ctx.beginPath();
ctx.arc(100,120,30,0,2 * Math.PI ,false);
ctx.fillStyle = "silver";
ctx.fill();

ctx.beginPath();
ctx.arc(100,120,2,0,2 * Math.PI ,false);
ctx.fillStyle = "white";
ctx.fill();

// draw digits
// calculate digit
ctx.beginPath()

// draw digit
ctx.fill(digit);



// The initial Eventlistener. Substitute with whatever Event you need to call the timer.
// timerCanvas.addEventListener('click', window.requestAnimationFrame( mainLoop ), false);
