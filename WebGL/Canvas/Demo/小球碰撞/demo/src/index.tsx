import '@eleven.fe/reset.css';
import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import BallCollision from '../../src/index';
import { balls } from './constants';

const CanvasWrapper = styled.canvas`
  width: 100%;
  height: 40vh;
`;

const App = () => {
  let canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 初始化
    canvasEl.current &&
      new BallCollision({
        canvas: canvasEl.current,
        balls,
        speedMin: -0.5,
        speedMax: 0.5,
        bgColor: 'rgb(107, 127, 244)',
      });
  }, []);

  return <CanvasWrapper ref={canvasEl} />;
};

render(<App />, document.getElementById('root'));
