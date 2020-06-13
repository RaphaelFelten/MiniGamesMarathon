export const loadImage = async (url) => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.addEventListener('load', () => { resolve(img) });
    });
}

export const loadJson = async (url) => {
    return new Promise(async resolve => {
        const res = await fetch(url);
        resolve(res.json());
    });
}
