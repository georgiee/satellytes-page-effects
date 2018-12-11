import { fromEvent, Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap, takeUntil, tap } from 'rxjs/operators';


export class Runner {
  private _effect;
  private _running = false;
  private _destroy$ = new Subject();

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    fromEvent(window, 'keydown').pipe(
      takeUntil(this._destroy$),
      filter(() => this._running),
      filter((event: KeyboardEvent) => event.key === 'Escape'),
      tap(() => this.stop())
    ).subscribe();

    fromEvent(window, 'click').pipe(
      filter(() => this._running),
      tap(() => this.stop())
    ).subscribe();
  }

  handleKeyDown(event) {
    if(event.key === 'Escape') {
      this.destroy();
    }
  }

  start() {
    this._running = true;
    this._effect.start();
  }

  stop() {
    if(!this._running) {
      return;
    }

    this._running = false;
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
    this._destroy$.next();

    this.stop();
    this._effect = null;
  }
}
