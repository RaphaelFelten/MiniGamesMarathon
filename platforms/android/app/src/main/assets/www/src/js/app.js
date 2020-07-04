import GameRunner from './GameRunner.js';
import TitleMenu from './TitleMenu.js';
import * as loader from './loader.js';

const SCREEN_RATIO = 5/10;

const canvas = document.getElementById('screen');
canvas.height = window.innerHeight;
canvas.width = window.innerHeight * SCREEN_RATIO;

const main = (async () => {
    await loader.loadFont('ZeroVelocity', '../www/src/css/zero-velocity-brk.regular.ttf');
    const titleMenu = new TitleMenu(canvas);
    await titleMenu.draw();
    new GameRunner(canvas).start();
})();


