/* This JS script calls a loop upon request, which controls the timer.
   The timer controls the scripted drawing of an oldschool stopwatch like animation in the selected html canvas.
   This file is heavily annotated.
*/
//// Definitions
// Set Time
var countDown = {
  value: 300 };
  // 300 = 30 seconds

// Select the <canvas> element in the html file:
var timerCanvas = document.getElementById('timercanvas');
var ctx = timerCanvas.getContext('2d');

//  Variables
countDown.defaultValue = countDown.value;
var angleIncrement = ( Math.PI*2 / countDown.defaultValue);
var watchElements = Math.floor( countDown.defaultValue / 10 );
var zeroAngle = (-( Math.PI * 1/2 ));
var tLast = 0;
var iFrame = 0;
var totalGameTime = 0;
var tDiff = 0;
var tInit = 0;
// The initial Eventlistener. Substitute with whatever Event you need to call the timer.
timerCanvas.addEventListener('click', function(){window.requestAnimationFrame( mainLoop )}, false);

// Draw Background
// drawGrid(); // Uncomment if you wish to see a document grid (for drawing).
drawWatch();

//// Animation Loop
function mainLoop(tStart) {
    var stopLoop = window.requestAnimationFrame( mainLoop );

    if (iFrame === 0){tInit = tStart;}
    if (tStart > (tLast + 100 - tDiff)){ // Interval 10 Hz
      iFrame++;
      // check if its over
      if ( countDown.value <= 0 ) {
          window.cancelAnimationFrame( stopLoop );
          // log total elapsed time
          totalGameTime = Math.floor(tStart - tInit) / 1000;
          logStuff(totalGameTime);
          // Return Value ~ mainLoop hasFinished
          return true;
      } else {
        // Decrease countdown
        countDown.value--;
        tDiff = tStart - tLast - 100;
        // calculate current digit
        var startDigitAngle = zeroAngle + (angleIncrement * (iFrame ));
        var stopDigitAngle = startDigitAngle;
        // trail
        ctx.beginPath();
        ctx.arc(100,130,43,zeroAngle,startDigitAngle,false);
        ctx.lineTo(100,130);
        var overlayColor = "rgb(255,"+(countDown.defaultValue*2 - iFrame*2)+","+(countDown.defaultValue*2 - iFrame*3)+")";
        ctx.fillStyle = overlayColor;
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        // digit
        ctx.beginPath();
        ctx.moveTo(100,130);
        ctx.arc(100,130,42,startDigitAngle,stopDigitAngle, false);
        ctx.strokeStyle = "white";
        ctx.lineWidth = "3";
        ctx.stroke();
                // How could I fade out the digit trail? -dont draw a segment. only a trail of ~20 faiding digit lines?
      }
    }
    tLast = tStart;
} // End Loop


//// draw background
// --maybe export and copy into canvas? Only watchElements would need to be forewarded-
function drawWatch() {
  ctx.globalCompositeOperation = "source-over";
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

  for (var i = 0; i <= watchElements ; i++) {
    if (i % 5 === 0) {
      ctx.strokeStyle = "dimgrey";
      ctx.lineWidth = "2";
    } else {
      ctx.strokeStyle = "darkgrey";
      ctx.lineWidth = "0";
    }
    ctx.beginPath();
    ctx.moveTo(100,130);
    var startAngle = zeroAngle + i * (Math.PI*2/watchElements);
    var stopAngle = zeroAngle + (i + 0.05) * (Math.PI*2/watchElements);
    ctx.arc(100,130,48,startAngle,stopAngle,false);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(100,130,30,0,2 * Math.PI ,false);
  ctx.fillStyle = "silver";
  ctx.fill();

  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "mediumslateblue";
  ctx.fillText(countDown.defaultValue/10+"s", 100, 150);

  ctx.beginPath();
  ctx.arc(100,130,2,0,2 * Math.PI ,false);
  ctx.moveTo(100,130);
  ctx.arc(100,130,44,zeroAngle,zeroAngle*1.01,true);
  ctx.lineWidth = "2";
  ctx.strokeStyle = "whitesmoke";
  ctx.stroke();
}

// --OPTIONAL
// canvas grid - to make canvas drawing a bit less difficult
function drawGrid(){
  for (var i = 1; i <= 20; i++) {
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
  }
}
// log function
function logStuff(entry) {
    var logList = document.getElementById('log');
    var logEntry = document.createElement('li');
    logList.appendChild(logEntry);
    logEntry.innerHTML = entry;
}
