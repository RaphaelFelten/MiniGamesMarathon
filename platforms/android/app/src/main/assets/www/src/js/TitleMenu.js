import * as layers from './layers.js';
import * as loader from './loader.js';
import * as utils from './utils.js';

export default class TitleMenu {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    async draw() {
        return new Promise(async resolve => {
            const backgroundImage = await loader.loadImage('./assets/GoDownUnder/background.png');
            layers.drawBackground(backgroundImage, { canvas: this.canvas, context: this.context, deltaTime: 0});
            
            this.context.fillStyle = '#555';
            this.context.strokeStyle = '#11ffdd';
            this.context.textAlign = 'center';
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.shadowColor = "rgba(255,255,255,0.7)";
            this.context.shadowBlur = 4;

            this.context.font = '40px ZeroVelocity';
            this.context.strokeText('MINIGAMES', this.canvas.width / 2, this.canvas.height / 8);
            
            const gradient = this.context.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "#11ffbb");
            gradient.addColorStop(1, "white");
            this.context.fillStyle = gradient;

            this.context.fillText('ADVENTURE', this.canvas.width / 2, this.canvas.height / 8 + 50);

            this.context.font = '20px ZeroVelocity';

            this.context.strokeStyle = 'rgba(20, 50, 80)';
            this.context.shadowColor = "rgba(255,255,255,0)";

            this.context.fillStyle = 'rgba(20, 255, 200, .5)';
            utils.drawPixelatedRectangle(this.context, this.canvas.width * 0.1, this.canvas.height / 2.5 - 47, this.canvas.width * 0.8, 75, 20);
            this.context.fillStyle = 'rgba(20, 50, 80)';
            this.context.fillText('STORY MODE', this.canvas.width / 2, this.canvas.height / 2.5);

            this.context.fillStyle = 'rgba(20, 255, 200, .5)';
            utils.drawPixelatedRectangle(this.context, this.canvas.width * 0.1, (this.canvas.height / 2.5 + 150) - 47, this.canvas.width * 0.8, 75, 20);
            this.context.fillStyle = 'rgba(20, 50, 80)';
            this.context.fillText('SOLO MODE', this.canvas.width / 2, this.canvas.height / 2.5 + 150);

            this.context.fillStyle = 'rgba(20, 255, 200, .5)';
            utils.drawPixelatedRectangle(this.context, this.canvas.width * 0.1, (this.canvas.height / 2.5 + 300) - 47, this.canvas.width * 0.8, 75, 20);
            this.context.fillStyle = 'rgba(20, 50, 80)';
            this.context.fillText('RANKED', this.canvas.width / 2, this.canvas.height / 2.5 + 300);

            document.addEventListener('click', () => resolve());
        });

    }

}
