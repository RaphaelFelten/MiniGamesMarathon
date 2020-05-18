import Timer from './Timer.js';
import World from './World.js';
import * as GoDownUnder from './games/GoDownUnder/GoDownUnder.js';

export default class GameRunner {
    constructor(canvas) {
        this.gameIndex = 0;
        this.frameRate = 1/60;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.games = [GoDownUnder];
    }

    async start() {
        this.timer = new Timer(this.frameRate);
        this.world = new World();
        const gameContext = { world: this.world, canvas: this.canvas, context: this.context };
        const setupData = await this.games[this.gameIndex].setup(gameContext);
        this.timer.update = async (deltaTime) => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.games[this.gameIndex].run({ ...gameContext, deltaTime }, setupData);
        };
        this.timer.start();
    }

    runNext() {
        this.stop();
        if (this.gameIndex < this.games.length) {
            this.gameIndex++;
            setTimeout(() => this.start(), 1000);
        }
    }

    stop() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.timer.update = null;
        this.timer = null;
    }

}
