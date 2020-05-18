export const drawBackground = (image, gameContext) => {
    gameContext.context.drawImage(image, 0, 0, gameContext.canvas.width, gameContext.canvas.height);
}
