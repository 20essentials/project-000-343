const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = (canvas.width = window.innerWidth);
let canvasHeight = (canvas.height = window.innerHeight);
let halfWidthCanvas = canvasWidth / 2;
let halfHeightCanvas = canvasHeight / 2;
let squareWidth = 10;
let numOfLines = 500;
let saveInterval = null;

const resize = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
  halfWidthCanvas = canvasWidth / 2;
  halfHeightCanvas = canvasHeight / 2;
};

function drawLine(x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

let i = 1;
let mult = 0;

function drawSimmetric() {
  let lineCounter = 0; 
  saveInterval = setInterval(() => {
    if (lineCounter < numOfLines ) {  
      const currentMult = Math.floor(lineCounter / 4); 
      console.log({
        lineCounter,
        numOfLines: numOfLines * 4,
        currentMult
      })
      if (lineCounter % 4 === 0) {
        drawLine(
          halfWidthCanvas - squareWidth * currentMult,
          halfHeightCanvas - squareWidth * currentMult,
          halfWidthCanvas + squareWidth * (currentMult + 1),
          halfHeightCanvas - squareWidth * currentMult,
          '#e81cff'
        );
      } else if (lineCounter % 4 === 1) {
        drawLine(
          halfWidthCanvas + squareWidth * (currentMult + 1),
          halfHeightCanvas - squareWidth * currentMult,
          halfWidthCanvas + squareWidth * (currentMult + 1),
          halfHeightCanvas + squareWidth * (currentMult + 1),
          '#e81cff'
        );
      } else if (lineCounter % 4 === 2) {
        drawLine(
          halfWidthCanvas + squareWidth * (currentMult + 1),
          halfHeightCanvas + squareWidth * (currentMult + 1),
          halfWidthCanvas - squareWidth * (currentMult + 1),
          halfHeightCanvas + squareWidth * (currentMult + 1),
          '#e81cff'
        );
      } else if (lineCounter % 4 === 3) {
        drawLine(
          halfWidthCanvas - squareWidth * (currentMult + 1),
          halfHeightCanvas + squareWidth * (currentMult + 1),
          halfWidthCanvas - squareWidth * (currentMult + 1),
          halfHeightCanvas - squareWidth * (currentMult + 1),
          '#e81cff'
        );
      }

      lineCounter++; 
    } else {
      clearInterval(saveInterval); 
    }
  }, 150);
}

window.addEventListener("resize", _ => {
  resize();
  i = 1;
  mult = 0;
  drawSimmetric();
});

document.addEventListener("DOMContentLoaded", e => {
  drawSimmetric();
});
