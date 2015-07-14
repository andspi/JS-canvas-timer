/* This JS script calls a loop upon request, which controls the timer.
   The timer controls the scripted drawing of an oldschool stopwatch like animation in the selected html canvas.
   This file is heavily annotated, so the intended function of the various parts is clarified.
*/
//// Definitions
// Set Time
var countDown = 300; // 300 = 30 seconds
// Select the <canvas> element in the html file:
var timerCanvas = document.getElementById('timercanvas');
var ctx = timerCanvas.getContext('2d');
// The initial Eventlistener. Substitute with whatever Event you need to call the timer.
timerCanvas.addEventListener('click', function(){window.requestAnimationFrame( mainLoop )}, false);

//  Variables
var angleIncrement = ( Math.PI*2 / countDown);
var elements = Math.floor( countDown / 10 );
var zeroAngle = (-(Math.PI * 1/2));
var tLast = 0;
var iFrame = 0;

//// Animation Loop
function mainLoop(tStart) {
    var stopLoop = window.requestAnimationFrame( mainLoop );
    // Interval 10 Hz
    if (tStart > (tLast + 100)){
      iFrame++;
      // check if its over
      if ( countDown.value <= 0 ) {
          window.cancelAnimationFrame( stopLoop );
          // Return Value ~ mainLoop hasFinished
          return true;
      } else {
        // Decrease countdown
        countDown--;
        // calculate current digit
        var digit = new Path2D();
        digit.moveTo(100,130);
        var startDigitAngle = zeroAngle + (angleIncrement * (iFrame - 1));
        var stopDigitAngle = zeroAngle + (angleIncrement * iFrame);
        digit.arc(100,130,45,startDigitAngle,stopDigitAngle, false);
        ctx.strokeStyle = "crimson";
        ctx.stroke(digit);
        // fade prior digits
        // --how?
        // --desaturate all red inside?
      }
    }
} // End Loop

//// canvas grid - to make canvas drawing a bit less difficult
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

//// draw background
// Head
ctx.beginPath();
ctx.arc(100,40,26,0,2 * Math.PI ,false);
ctx.fillStyle = "silver";
ctx.fill();
ctx.strokeStyle = "slategrey";
ctx.lineWidth = "0";
ctx.stroke();

ctx.beginPath();
ctx.globalCompositeOperation = "destination-out";
ctx.arc(100,40,20,0,2 * Math.PI ,false);
ctx.fill();
ctx.globalCompositeOperation = "source-over";
ctx.strokeStyle = "dimgrey";
ctx.lineWidth = "0";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(90,95);
ctx.rect(95,40,10,30);
ctx.moveTo(90,35);
ctx.rect(90,35,20,20);
ctx.fillStyle = "lightgrey";
ctx.fill();
ctx.strokeStyle = "white";
ctx.stroke();

// Body
ctx.beginPath();
ctx.arc(100,130,60,0,2 * Math.PI ,false);
ctx.fillStyle = "slategrey";
ctx.fill();

ctx.beginPath();
ctx.arc(100,130,58,0,2 * Math.PI ,false);
ctx.fillStyle = "whitesmoke";
ctx.fill();

ctx.beginPath();
ctx.arc(100,130,52,0,2 * Math.PI ,false);
ctx.fillStyle = "silver";
ctx.fill();
ctx.strokeStyle = "black";
ctx.lineWidth = "0";
ctx.stroke();

for (var i = 0; i <= elements ; i++) {
  if (i % 5 === 0) {
    ctx.strokeStyle = "dimgrey";
    ctx.lineWidth = "2";
  } else {
    ctx.strokeStyle = "darkgrey";
    ctx.lineWidth = "0";
  }
  ctx.beginPath();
  ctx.moveTo(100,130);
  var startAngle = zeroAngle + i * (Math.PI*2/elements);
  var stopAngle = zeroAngle + (i + 0.05) * (Math.PI*2/elements);
  ctx.arc(100,130,48,startAngle,stopAngle,false);
  ctx.stroke();
}

ctx.beginPath();
ctx.arc(100,130,30,0,2 * Math.PI ,false);
ctx.fillStyle = "silver";
ctx.fill();

ctx.beginPath();
ctx.arc(100,130,2,0,2 * Math.PI ,false);
ctx.fillStyle = "white";
ctx.fill();
