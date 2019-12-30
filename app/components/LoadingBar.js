// @flow
import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

const LoadingBar = () => {
  const [completion, setCompletion] = useState(0);
  ipcRenderer.on('complettionChange', (e, percentage) =>
    setCompletion(percentage)
  );
  return <div>{`loading ${completion}`}</div>;
};

export default LoadingBar;
