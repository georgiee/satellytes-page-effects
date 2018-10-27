import { Runner } from "./runner";

let runner: Runner;

export class EffectFactory {
  public static getEffectList():string[] {
    return [
      '@satellytes/effect-star-wars',
      '@satellytes/effect-svg-perlin-noise'
    ]
  }
  public static run(Effect, options):void {
    if(!runner) {
      runner = new Runner();
    }

    runner.run(Effect, options);
  }


  public static stop():void {
    if(runner) {
      runner.stop();
    }
  }
}
