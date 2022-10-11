import React, { useEffect, useRef } from 'react';
import skycons from './skycons';

function setIcon(icon, animate, skyconIcon, canvas) {
  skyconIcon.add(canvas, skycons[icon]);
  if (animate) {
    skyconIcon.play();
  }
}

export default function ReactAnimatedWeather(_ref) {
  const { icon } = _ref;
  const { color } = _ref;
  const { size } = _ref;
  const { animate } = _ref;

  const skyconCanvas = useRef(null);

  useEffect(() => {
    const skyconIcon = new skycons({ color, resizeClear: true });
    const canvas = skyconCanvas.current;
    setIcon(icon, animate, skyconIcon, canvas);

    return function () {
      skyconIcon.remove(canvas);
    };
  }, [icon, color, animate, size]);

  return <canvas ref={skyconCanvas} width={size} height={size} />;
}