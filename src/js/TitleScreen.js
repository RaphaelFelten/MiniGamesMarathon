import { wrapText } from './utils.js';
import * as layers from './layers.js';

export default class TitleScreen {
    constructor(json, backgroundImage, gameContext) {
        this.title = json.title;
        this.description = json.description;
        this.backgroundImage = backgroundImage;
        this.gameContext = gameContext;
        this.buttonX;
        this.buttonY;
        this.buttonH;
        this.buttonW;
    }

    async draw() {
        this.buttonX = this.gameContext.canvas.width * 0.1;
        this.buttonY = this.gameContext.canvas.height - this.gameContext.canvas.height / 5;
        this.buttonW = this.gameContext.canvas.width * 0.8;
        this.buttonH = this.gameContext.canvas.height / 10;

        layers.drawBackground(this.backgroundImage, { ...this.gameContext, deltaTime: 0});
        
        return new Promise(async resolve => {
            this.gameContext.context.fillStyle = '#fff';
            this.gameContext.context.textAlign = 'center';

            this.gameContext.context.font = 'bold 45px Segoe UI';
            this.gameContext.context.fillText(this.title, this.gameContext.canvas.width / 2, this.gameContext.canvas.height / 10);
            
            this.gameContext.context.font = '25px Segoe UI';
            wrapText(this.gameContext.context, this.description, this.gameContext.canvas.width / 2, this.gameContext.canvas.height / 5, this.gameContext.canvas.width * 0.9, 30);

            this.gameContext.context.fillStyle = '#1177bb';
            this.gameContext.context.fillRect(this.buttonX, this.buttonY, this.buttonW, this.buttonH);

            this.gameContext.context.fillStyle = '#fff';
            this.gameContext.context.font = 'bold 50px Segoe UI';
            this.gameContext.context.fillText('PLAY', this.gameContext.canvas.width / 2, this.buttonY + this.buttonH / 1.4);

            window.addEventListener('click', (e) => {
                if (e.clientX > this.buttonX &&
                    e.clientX < this.buttonX + this.buttonW &&
                    e.clientY > this.buttonY &&
                    e.clientY < this.buttonY + this.buttonH) {

                        this.gameContext.context.fillStyle = '#1199bb';
                        this.gameContext.context.fillRect(this.buttonX, this.buttonY, this.buttonW, this.buttonH);
                        
                        this.gameContext.context.fillStyle = '#fff';
                        this.gameContext.context.font = 'bold 50px Segoe UI';
                        this.gameContext.context.fillText('PLAY', this.gameContext.canvas.width / 2, this.buttonY + this.buttonH / 1.4);
                        
                         setTimeout(() => {
                            resolve();
                        }, 250);
                    }
            });

        });
    }

}
