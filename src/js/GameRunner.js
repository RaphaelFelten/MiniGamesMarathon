import * as layers from './layers.js';
import Timer from './Timer.js';
import World from './World.js';
import Dashboard from './Dashboard.js';
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
        const world = new World();
        const dashboard = new Dashboard();
        const gameContext = { world, canvas: this.canvas, context: this.context, dashboard };
        const setupData = await this.games[this.gameIndex].setup(gameContext);
        this.timer.update = async (deltaTime) => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            layers.drawBackground(setupData.backgroundImage, gameContext);
            this.games[this.gameIndex].run({ ...gameContext, deltaTime, gameRunner: this }, setupData);
            layers.drawDashBoard(gameContext);
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
