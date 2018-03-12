/* eslint no-param-reassign: "off" */
/* eslint no-plusplus: "off" */
/* eslint no-return-assign: "off" */
Math.easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
};


const getScrollTop = () => window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

const setScrollTop = arg => {
  document.body.scrollTop = arg;
  document.documentElement.scrollTop = arg;
}

const scrollYTo = (arg) => {
  const scrollTop = getScrollTop();
  const start = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const elapsed = timestamp - start;
    setScrollTop(Math.easeInOutCubic(elapsed, scrollTop, arg, 450));
    if (elapsed < 450) {
      window.requestAnimationFrame(frameFunc);
    }
  };
  window.requestAnimationFrame(frameFunc);
};

export { scrollYTo as default }
