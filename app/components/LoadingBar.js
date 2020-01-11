// @flow
import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Style from './loading.css';

const LoadingBar = () => {
  const [completion, setCompletion] = useState(0);
  ipcRenderer.on('complettionChange', (e, percentage) =>
    setCompletion(parseFloat(percentage * 100).toFixed(1))
  );
  if (!completion) {
    return '';
  }
  return (
    <div className={Style.bar}>
      <div className={Style.text}>{`loading ${completion}%`}</div>
      <div className={Style.inner} style={{ width: `${completion}%` }} />
    </div>
  );
};

export default LoadingBar;
