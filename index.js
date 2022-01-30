'use strict';

import { ctxOptions } from './ctxOptions.js';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  console.log('lol');

  if (!isDrawing) return; //stop the fn from running when they are not moused down

  console.log(e);
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  // ctx.lineWidth = hue;

  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  //lastX = e.offsetX;
  //lastY = e.offsetY;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
  // ctx.lineWidth++;
}
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

let globalCompositeButton = document.getElementById(
  'global-composite-operation-button'
);

// DOM buttons holder
let dom = {
  globalCompositeButton: document.getElementById(
    'global-composite-operation-button'
  ),
  lineJoinButton: document.getElementById('line-join-button'),
  lineCapButton: document.getElementById('line-cap-button'),
};

dom.globalCompositeButton.addEventListener('click', changeGlobalComposite);
function changeGlobalComposite() {
  if (ctx.globalCompositeOperation === 'multiply') {
    ctx.globalCompositeOperation = 'source-over';
  } else {
    ctx.globalCompositeOperation = 'multiply';
  }
  dom.globalCompositeButton.textContent = `ctx.globalCompositeOperation = ${ctx.globalCompositeOperation}`;
}

// lineJoin  --toggles from 'round' to 'miter' to 'bevel'
dom.lineJoinButton.addEventListener('click', changeLineJoin);
function changeLineJoin() {
  let index = ctxOptions.lineJoinOptions.indexOf(ctx.lineJoin);
  index++;
  if (index >= ctxOptions.lineJoinOptions.length) index = 0;
  ctx.lineJoin = ctxOptions.lineJoinOptions[index];
  dom.lineJoinButton.textContent = `ctx.lineJoin = ${ctx.lineJoin}`;
}

// lineCap  --toggles from 'round' to 'butt' to 'square'
dom.lineCapButton.addEventListener('click', changeLineCap);
function changeLineCap() {
  let index = ctxOptions.lineCapOptions.indexOf(ctx.lineCap);
  index++;
  if (index >= ctxOptions.lineCapOptions.length) index = 0;
  ctx.lineCap = ctxOptions.lineCapOptions[index];
  dom.lineCapButton.textContent = `ctx.lineCap = ${ctx.lineCap}`;
}
