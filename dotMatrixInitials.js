(function(window, document, undefined) {
/////////////////////////////
var script = document.getElementsByTagName('script')[0];
var initials = script.getAttribute('initials');

var canvasWidth = 435;
var canvasHeight = 220;
var dotRows = 51;
var dotCols = 200;

var textNameCanvas = document.createElement('canvas');
textNameCanvas.style.margin = '0 50px 0';
document.body.insertBefore(textNameCanvas, document.body.children[0]);
textNameCanvas.width = canvasWidth;
textNameCanvas.height = canvasHeight;
var dotMatrix = textNameCanvas.getContext('2d');

// limit initials to 3 letters
var inputText = initials;
var tempText = inputText.split('');
var inputLength = tempText.length;
var tempTextArr = tempText.reverse().slice(tempText.length - 3).reverse();
initialsText = tempTextArr.join('');

dotMatrix.font = '300px monospace';
var textWidth = dotMatrix.measureText(initialsText).width;
textNameCanvas.width = textWidth + 20;
var xIncrement = textNameCanvas.width / dotCols;
var yIncrement = canvasHeight / dotRows;

// write initials
dotMatrix.fillStyle = 'rgba(100, 100, 100, 0.01)'; // super high transparency
dotMatrix.font = '300px monospace';
dotMatrix.textBaseline = "middle";
dotMatrix.textAlign = "left";
dotMatrix.fillText(initialsText.toUpperCase(), xIncrement, canvasHeight / 2);

// is pixel inside a letter?
function pixelUsed(x, y) {
  var textPixels = dotMatrix.getImageData(x, y, canvasWidth, canvasHeight);
  var pixel = textPixels.data;

  for (var i = 0, pixelLength = pixel.length; i < pixelLength; i += 4) {
    if ( pixel[i + 3] !== 0) {
      return true;
    }
    return false;
  }
}

var colorSeed1 = 90;
var colorSeed2 = 230;
for (var i = 1; i < dotRows; i++) {
  for (var j = 1; j < dotCols; j++) {
    var redShade   = colorSeed1 - i * 5 + colorSeed2 + j / 5;
    var greenShade = i * 5 - colorSeed2 + j / 5;
    var blueShade  = colorSeed1 + i * 5 + j / 5;
    dotMatrix.fillStyle = 'rgb(' + redShade + ',' + greenShade + ',' + blueShade + ')';
    var center = [xIncrement * j, yIncrement * i];
    if (pixelUsed(center[0], center[1])) {
      dotMatrix.beginPath(); // this effects rasteration... its interesting
      dotMatrix.moveTo(center[0], center[1]);
      dotMatrix.arc(center[0], center[1], 1.5, 0, 2 * Math.PI, false);
      dotMatrix.fill();
      dotMatrix.closePath();
    }
  }
}
/////////////////////////////
})(window, document);