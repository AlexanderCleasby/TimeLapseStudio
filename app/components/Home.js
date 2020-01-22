// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import LoadingBar from './LoadingBar';
import styles from './Home.css';
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
  changeScale: number => void
};

type State = {
  selectedImage: ImageType
};

export default class Home extends Component<Props, State> {
  props: Props;

  constructor({ addImage }: Props) {
    super();
    this.state = {
      selectedImage: { id: '', path: '' }
    };
    ipcRenderer.on('imagesSelected', (e, args) => {
      console.log(args);
      addImage(args);
    });
    ipcRenderer.on('exportDone', (e, args) => console.log(args));
    ipcRenderer.on('complettionChange', (e, arg) => console.log(arg));
  }

  selectImage = (image: ImageType) => this.setState({ selectedImage: image });

  render() {
    const {
      images,
      changeSpeed,
      changeScale,
      settings,
      deleteImage
    } = this.props;
    const { speed, scale } = settings;
    const { selectedImage } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <ImageView selectedImage={selectedImage} deleteImage={deleteImage} />
        <MenuPanel
          speed={speed}
          scale={scale}
          changeScale={changeScale}
          changeSpeed={changeSpeed}
        />
        <Slides
          imageId={selectedImage.id}
          images={images}
          selectImage={this.selectImage}
          selectedImage={selectedImage}
        />
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
