export class Runner {
  private _effect;
  private _running = false;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if(event.key === 'Escape') {
      this.destroy();
    }
  }

  start() {
    this._running = true;
    this._effect.start();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  stop() {
    if(!this._running) {
      return;
    }

    this._running = false;
    document.removeEventListener('keydown', this.handleKeyDown);
    this._effect.stop();
  }

  run(Effect, options) {
    if(this._running) {
      this.stop();
    }

    this._effect = Effect.create(options);
    this.start();
  }

  destroy() {
    this.stop();
    this._effect = null;
  }
}
