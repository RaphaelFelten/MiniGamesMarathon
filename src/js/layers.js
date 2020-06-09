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