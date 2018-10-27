// easing functions http://goo.gl/5HLl8
const easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

const  easeInCubic = function(t, b, c, d) {
  var tc = (t/=d)*t*t;
  return b+c*(tc);
};

const inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

function getScrollElement () {
  const el = document.scrollingElement || document.documentElement
  return el
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function scrollTo(to, callback, {maxDuration = 500}) {
  const scrollElement = getScrollElement();
  const move = amount => scrollElement.scrollTop = amount;
  const position = () => scrollElement.scrollTop;

  const scrollDelta = scrollElement.scrollTop;
  // remove the window height
  const scrollHeight = scrollElement.scrollHeight - window.innerHeight;
  const scrollRatio = scrollDelta/scrollHeight;

  // interpolate the actual duration depending of the scroll position
  // duration of 0 when at the top, 1 when at the bottom
  const duration = lerp(0, maxDuration, scrollRatio);

  const start = position();
  const change = to - start;
  let stopped = false;

  let currentTime = 0;
  const increment = 20;

  const cancel = () => {
    cancelAnimationFrame(currentRAF);
  }

  let currentRAF;
  const loop = () => {
    if(stopped) {
      return
    }

    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    move(val);

    if (currentTime < duration) {
      currentRAF = requestAnimationFrame(loop);
    } else {
      if (callback && typeof(callback) === 'function') {
        callback();
      }
    }

  };

  loop();

  return {
    cancel
  }
}


export {
  scrollTo
}