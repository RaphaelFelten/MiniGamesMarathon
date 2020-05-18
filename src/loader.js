export const loadImage = async (url) => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.addEventListener('load', () => { resolve(img) });
    });
}
