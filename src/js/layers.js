let backgroundPosition = 0;

export const drawBackground = (image, gameContext) => {
    if (backgroundPosition >= image.height) {
        backgroundPosition = 0;
    } else {
        backgroundPosition += gameContext.deltaTime * 30;
    }
    gameContext.context.drawImage(image, -image.width / 2, backgroundPosition - image.height, image.width, image.height);
    gameContext.context.drawImage(image, -image.width / 2, backgroundPosition, image.width, image.height);
}

export const drawDashBoard = (gameContext) => {
    gameContext.context.font = '30px Arial';
    gameContext.context.fillStyle = '#fff';
    gameContext.context.textAlign = 'center';
    gameContext.context.fillText(gameContext.dashboard.score, gameContext.canvas.width / 2, 30);
}

export const drawRandomRectFromSpriteSheet = (gameContext, spriteSheet, tiles, nDiv, x, y, w, h) => {
    const tileSize = Math.floor(spriteSheet.width / nDiv);

    const tileSizeInRect = w < h ? w : h;

    const nTilesX = w < h ? 1 : Math.floor(w / tileSizeInRect);
    const nTilesY = h < w ? 1 : Math.floor(h / tileSizeInRect);
    const tileSpace = Math.floor((w < h ? h : w) % tileSizeInRect / (w < h ? nTilesY : nTilesX));

    for (let i = 0; i < nTilesX; i++) {
        let canvX = x + (tileSizeInRect * i) + (tileSpace * i);
        gameContext.context.drawImage(spriteSheet,
                                tiles[i][0] * tileSize,
                                tiles[i][1] * tileSize,
                                tileSize,
                                tileSize,
                                canvX,
                                y,
                                tileSizeInRect,
                                tileSizeInRect);
    }

    
}