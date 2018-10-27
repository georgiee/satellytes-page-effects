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
    console.log('start')
    this._running = true;
    this._effect.start();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  stop() {
    console.log('try stop', this._running)
    if(!this._running) {
      return;
    }

    this._running = false;
    document.removeEventListener('keydown', this.handleKeyDown);
    this._effect.stop();
  }

  run(Effect, options) {
    console.log('try start', this._running)
    if(this._running) {
      this.stop();
    }
    console.log('continue start', this._running)

    this._effect = Effect.create(options);
    this.start();
  }

  destroy() {
    console.log('desotr')
    this.stop();
    this._effect = null;
  }
}
