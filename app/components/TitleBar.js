import React from 'react';
import Style from './titleBar.scss';

const { remote } = require('electron');

const win = remote.BrowserWindow.getFocusedWindow;
const close = () => win().close();
const maximize = () =>
  win().isMaximized() ? win().unmaximize() : win().maximize();
const minimize = () => win().minimize();

const TitleBar = () => (
  <div className={Style.titleBar}>
    Time Lapse Studio
    <button type="button" className={Style.close} onClick={close}>
      <i className="fa fa-times fa-3x" />
    </button>
    <button type="button" className={Style.maximize} onClick={maximize}>
      <i className="fa fa-window-maximize fa-3x" />
    </button>
    <button type="button" className={Style.minimize} onClick={minimize}>
      <i className="fa fa-window-minimize fa-3x" />
    </button>
  </div>
);

export default TitleBar;
