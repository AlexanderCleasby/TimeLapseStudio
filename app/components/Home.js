// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import LoadingBar from './LoadingBar';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Slides from './Slides';

type Props = {
  addImage: string => void,
  images: Array<{ id: string, path: string }>
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
    const { images } = this.props;
    return (
      <div className={styles.container} data-tid="container">
        <Slides images={images} />
        <button type="submit" onClick={() => ipcRenderer.send('open-dialog')}>
          Select Photos
        </button>
        <button
          type="button"
          onClick={() =>
            ipcRenderer.send('export', {
              imagePaths: images.map(image => image.path)
            })
          }
        >
          Export
        </button>
        <Link to={routes.COUNTER}>to Counter</Link>
        <LoadingBar />
      </div>
    );
  }
}
