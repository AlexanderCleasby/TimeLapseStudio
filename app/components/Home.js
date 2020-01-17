// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import LoadingBar from './LoadingBar';
import styles from './Home.css';
import Slides from './Slides';
import MenuPanel from './menuPanel';

type Props = {
  addImage: string => void,
  images: Array<{ id: string, path: string }>,
  settings: { scale: number, speed: number },
  changeSpeed: number => void,
  changeScale: number => void
};

export default class Home extends Component<Props> {
  props: Props;

  constructor({ addImage }: Props) {
    super();
    ipcRenderer.on('imagesSelected', (e, args) => {
      console.log(args);
      addImage(args);
    });
    ipcRenderer.on('exportDone', (e, args) => console.log(args));
    ipcRenderer.on('complettionChange', (e, arg) => console.log(arg));
  }

  render() {
    const { images, changeSpeed, changeScale, settings } = this.props;
    const { speed, scale } = settings;
    return (
      <div className={styles.container} data-tid="container">
        <MenuPanel
          speed={speed}
          scale={scale}
          changeScale={changeScale}
          changeSpeed={changeSpeed}
        />
        <Slides images={images} />
        <button type="submit" onClick={() => ipcRenderer.send('open-dialog')}>
          Select Photos
        </button>
        <button
          type="button"
          onClick={() =>
            ipcRenderer.send('export', {
              imagePaths: images.map(image => image.path),
              options: { speed, scale }
            })
          }
        >
          Export
        </button>
        <LoadingBar />
      </div>
    );
  }
}
