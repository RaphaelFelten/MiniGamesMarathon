export default class InputController {
  constructor() {
    this.queue = [];
    window.addEventListener('keydown', (e) => {
      this.emit(e.key);
    });
  }

  emit(key) {
    this.queue.forEach((item, index) => {
      if (item.key === key) {
        item.callback();
        this.queue.slice(index, 1);
      }
    });
  }

  on(key, callback) {
    this.queue.push({ key, callback });
  }
}
