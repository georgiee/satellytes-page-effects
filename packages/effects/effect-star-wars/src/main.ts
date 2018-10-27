import './styles.scss';
import { scrollTo } from "./utils";

class StarWarsEffect {
  private _scrollInstance;
  private _element: HTMLElement;
  private _duration: Number;

  constructor({element, duration = 3000}) {
    this._element = element;
    this._duration = duration;
    this.handleAnimationComplete = this.handleAnimationComplete.bind(this);
  }

  handleAnimationComplete(event) {
    if(this._element !== event.target) {
      return;
    }
    this.complete();
  }

  run() {
    this._element.classList.add("sy-effect-star-wars");
    this._element.style.setProperty('--duration', String(this._duration));
    this._element.addEventListener("animationend", this.handleAnimationComplete);
  }

  complete() {
    if(this._scrollInstance) {
      this._scrollInstance.cancel();
    }

    this._element.classList.remove("sy-effect-star-wars");
    this._element.removeEventListener("animationend", this.handleAnimationComplete);
  }

  start() {
    // first scroll up smoothly
    this._scrollInstance = scrollTo(0, () => {
      // then start animation
      this.run();
    }, {maxDuration: 1000})
  }

  stop() {
    this.complete();
  }
}


export function create(options) {
  const effect = new StarWarsEffect(options);

  function start() {
    effect.start()
  }

  function stop() {
    effect.stop()
  }

  return {
    start, stop
  }
}

