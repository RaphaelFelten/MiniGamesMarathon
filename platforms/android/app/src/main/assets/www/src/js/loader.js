export const loadImage = async (url) => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.addEventListener('load', () => { resolve(img) });
    });
}

export const loadJson = async (url) => {
    return new Promise(async resolve => {
        var xhr = new XMLHttpRequest
        xhr.onload = function() {
          resolve(JSON.parse(xhr.responseText));
        }
        xhr.onerror = function() {
          reject(new TypeError('Local request failed'))
        }
        xhr.open('GET', url)
        xhr.send(null)
    });
}

export const loadFont = async (name, url) => {
  return new Promise(async resolve => {
    const fontFace = new FontFace(name, 'url(' + url + ')');
    fontFace.load().then(font => {
        document.fonts.add(font);
        resolve();
    });
  });
}
