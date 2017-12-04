
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

let colors = ['#a15fbd', '#2ecfc8', '#F73C53', '#5ca9e1', '#F6E23B' ];
let dayBalls = [];
let bgColor = '#3A3A3A';

let bgOpacity = 1;

let space = 0;
let opacity = 0.5;
let padding = 0;
let squareSize = 0;
let amount = 10;

setRandomProps();
setColors();

var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

init();

function init() {

  canvas.width = size.width;
  canvas.height = size.height;

  amount = canvas.width * canvas.height / ( (squareSize + padding) * (squareSize + padding) );

  setRandomProps();
  setColors();

  start(-100, -100, 0);
}


function start(startX, startY, colorIndex) {

  let x = startX;
  let y = startY;

  for (var i = 0; i < amount; i++) {
    dayBalls.push( new Square(x, y, colorIndex) );

    if( x < canvas.width ){
      x += squareSize + padding;
    } else {
      y += colorIndex + padding;
      x = startX;
    }
  }

  colorIndex = Math.floor(Math.random() * 100) + 1

  if( colorIndex < colors.length) {
    colorIndex++;
  } else {
    colorIndex = 0;
  }

  if(dayBalls.length < 7000 ){
    start(startX+space, startY+space, colorIndex);
  }
}

function setColors(){
  for (var i = 0; i < 5; i++) {
    colors[i] = setRandomColor()
  }
}

function setRandomColor(){
    let color = {
      r: Math.floor(Math.random() * 255) + 1,
      g: Math.floor(Math.random() * 255) + 1,
      b: Math.floor(Math.random() * 255) + 1,
    }
    return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b) ;
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function setRandomProps() {
  space = Math.floor(Math.random() * 100) + 1;
  padding = Math.floor(Math.random() * 100) + 1;
  squareSize = Math.floor(Math.random() * 60) + 1;
}

requestAnimationFrame(draw);

function draw(){
  redrawBackground( bgOpacity );

  // Draw dem balls
  dayBalls.forEach(function(square) {


    square.draw();
  })

  requestAnimationFrame(draw);
}



function redrawBackground( bgOpacity ) {

  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor;
  ctx.globalAlpha = bgOpacity;
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function Square(x, y, color){

  location
  this.x = x;
  this.y = y;
  this.color = colors[color];

}

Square.prototype.update = function(y) {
  // this.y += y;
}


Square.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, squareSize, squareSize);
  ctx.fillStyle = this.color;
  ctx.globalAlpha = opacity;
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  this.update(this.y/1000);
}


function randomRadius(){
  return {
    x: Math.floor(Math.random() * canvas.width) + 1,
    y: Math.floor(Math.random() * canvas.height) + 1,
  }
}
