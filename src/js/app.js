import GameRunner from './GameRunner.js';

const SCREEN_RATIO = 5/10;

const canvas = document.getElementById('screen');
canvas.height = window.innerHeight;
canvas.width = window.innerHeight * SCREEN_RATIO;

new GameRunner(canvas).start();
