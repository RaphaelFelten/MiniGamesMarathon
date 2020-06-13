import Solid from './Traits/Solid.js';
import Rectangle from './Rectangle.js';

export function createBorders(
  gameContext,
  left = true,
  top = true,
  right = true,
  bottom = true
) {
  if (left) {
    const borderLeft = new Rectangle();
    borderLeft.addTrait(new Solid(borderLeft));
    borderLeft.width = 50;
    borderLeft.height = gameContext.canvas.height;
    borderLeft.pos.x = -50;
    borderLeft.pos.y = 0;
    gameContext.world.addEntity(borderLeft);
  }

  if (top) {
    const borderTop = new Rectangle();
    borderTop.addTrait(new Solid(borderTop));
    borderTop.width = gameContext.canvas.width;
    borderTop.height = 50;
    borderTop.pos.x = 0;
    borderTop.pos.y = -50;
    gameContext.world.addEntity(borderTop);
  }

  if (right) {
    const borderRight = new Rectangle();
    borderRight.addTrait(new Solid(borderRight));
    borderRight.width = 50;
    borderRight.height = gameContext.canvas.height;
    borderRight.pos.x = gameContext.canvas.width;
    borderRight.pos.y = 0;
    gameContext.world.addEntity(borderRight);
  }

  if (bottom) {
    const borderBottom = new Rectangle();
    borderBottom.addTrait(new Solid(borderBottom));
    borderBottom.width = gameContext.canvas.width;
    borderBottom.height = 50;
    borderBottom.pos.x = 0;
    borderBottom.pos.y = gameContext.canvas.height;
    gameContext.world.addEntity(borderBottom);
  }
}

export function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

export function enableMobileControls() {
  document.getElementById('controls').style.display = 'block';
}

export function disableMobileControls() {
  document.getElementById('controls').style.display = 'none';
}
