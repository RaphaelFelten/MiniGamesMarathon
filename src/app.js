import GameRunner from './GameRunner.js';
import * as GoDownUnder from './games/GoDownUnder/GoDownUnder.js';

(() => {
    const canvas = document.getElementById('screen');
    const gameRunner = new GameRunner(canvas);
    gameRunner.start(GoDownUnder);
})();


