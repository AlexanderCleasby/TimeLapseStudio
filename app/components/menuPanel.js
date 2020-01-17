/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import Styles from './menuPanel.scss';

type Props = {
  scale: number,
  speed: number,
  changeSpeed: number => void,
  changeScale: number => void
};

function MenuPanel(props: Props) {
  const { speed, scale, changeSpeed, changeScale } = props;
  return (
    <div className={Styles.menu}>
      <label>Speed: {speed}</label>
      <input
        value={speed}
        onChange={e => changeSpeed(e.target.value)}
        type="range"
        min="10"
        max="1000"
        step="10"
      />
      <label>Scale: {scale}</label>
      <input
        value={scale}
        onChange={e => changeScale(e.target.value)}
        type="range"
        min=".1"
        max="1"
        step=".1"
      />
    </div>
  );
}

export default MenuPanel;
