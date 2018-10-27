import { template } from "./template";


export function create(options) {
  console.log('create svg perlin noise effect');
  let svgElement;

  function start() {
    svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.innerHTML = template;
    document.body.appendChild(svgElement);

    document.body.style.filter = 'url("#sy-effects-displacementFilter")';
  }

  function stop() {
    console.log('stop perlin', svgElement);

    if(!svgElement) {
      return;
    }

    document.body.removeChild(svgElement);
    document.body.style.filter = null;
  }

  return {
    start, stop
  }
}

