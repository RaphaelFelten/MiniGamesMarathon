export default class InputController {
  constructor() {
    this.queue = [];
    this.keyStates = [];
    document.getElementById('left').addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.emit('ArrowLeft');
    });
    document.getElementById('right').addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.emit('ArrowRight');
    });
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    window.addEventListener('dblclick', (e) => {
      e.preventDefault();
    });
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (this.keyStates.filter(keyState => keyState.key === e.key).length < 1) {
        return this.keyStates.push({ key: e.key, state: 1});
      }
      this.keyStates.forEach((keyState) => {
        if (e.key === keyState.key) {
          return keyState.state = 1;
        }
      });
    });
    window.addEventListener('keyup', (e) => {
      this.keyStates.forEach((keyState) => {
        if (e.key === keyState.key) {
          return keyState.state = 0;
        }
      });
    });

    setInterval(() => {
      this.keyStates.forEach(keyState => {
        if (keyState.state === 1) {
          this.emit(keyState.key);
        }
      });
    }, 100);
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
