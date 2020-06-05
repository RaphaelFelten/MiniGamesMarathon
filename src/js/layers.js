export const drawBackground = (image, gameContext) => {
    gameContext.context.drawImage(image, -image.width / 2, 0, image.width, gameContext.canvas.height);
}

export const drawDashBoard = (gameContext) => {
    gameContext.context.font = '30px Arial';
    gameContext.context.fillStyle = '#fff';
    gameContext.context.textAlign = 'center';
    gameContext.context.fillText(gameContext.dashboard.score, gameContext.canvas.width / 2, 30);
}