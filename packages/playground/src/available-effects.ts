import { EffectFactory } from '@satellytes/effect-factory';

// We need to maintain this file as webpack needs to know about
// about the package being loaded during compile name. So no plain
// list of package name strings possible.

async function perlinNoise() {
  const Effect = await import('@satellytes/effect-star-wars');
  return Effect;
}

async function starWars() {
  const Effect = await import('@satellytes/effect-svg-perlin-noise');
  return Effect;
}

export const availableEffects = [starWars, perlinNoise];
