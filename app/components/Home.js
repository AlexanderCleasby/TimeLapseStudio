// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import LoadingBar from './LoadingBar';
import Styles from './Home.scss';
import Slides from './Slides';
import ImageView from './ImageView';
import MenuPanel from './menuPanel';
import { ImageType } from '../reducers/types';

type Props = {
  addImage: string => void,
  deleteImage: string => void,
  images: Array<ImageType>,
  settings: { scale: number, speed: number },
  changeSpeed: number => void,
  changeScale: number => void,
  selectedImage: ImageType,
  changeSelected: number => void
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
    const {
      images,
      changeSpeed,
      changeScale,
      settings,
      deleteImage,
      selectedImage,
      changeSelected
    } = this.props;
    const { speed, scale } = settings;
    return (
      <div className={Styles.container} data-tid="container">
        <ImageView selectedImage={selectedImage} deleteImage={deleteImage} />
        <MenuPanel
          speed={speed}
          scale={scale}
          changeScale={changeScale}
          changeSpeed={changeSpeed}
        />
        <Slides
          images={images}
          changeSelected={changeSelected}
          selectedImage={selectedImage}
        />
        <button
          type="submit"
          className={Styles.controlButton}
          onClick={() => ipcRenderer.send('open-dialog')}
        >
          Select Photos
        </button>
        <button
          type="button"
          className={Styles.controlButton}
          onClick={() =>
            ipcRenderer.send('export', {
              imagePaths: images.map(image => image.path),
              options: { speed, scale }
            })
          }
        >
          Export Time Lapse
        </button>
        <LoadingBar />
      </div>
    );
  }
}
