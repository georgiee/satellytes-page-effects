import { EffectFactory } from '@satellytes/effect-factory';
import "./sy-temp.css";
import { availableEffects } from './available-effects';

const scrollContainer = document.querySelector('.satellytes-scroll-container') as HTMLElement;
let lastIndex = -1;

async function nextEffect() {
  const count = availableEffects.length;

  let newIndex = Math.round((count - 1) * Math.random());

  if(newIndex == lastIndex) {
    newIndex = (newIndex + 1)%count;
  }

  lastIndex = newIndex;

  return availableEffects[newIndex]();
}

async function run() {
  const effect = await nextEffect();
  EffectFactory.run(effect, {element: scrollContainer});
}

const btnStart = document.querySelector('.btnStart')
const btnStop = document.querySelector('.btnStop')


btnStart.addEventListener('click', function() {
  run();
})

btnStop.addEventListener('click', function() {
  EffectFactory.stop();
})

run();