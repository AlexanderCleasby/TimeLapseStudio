/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow

import React from 'react';
import './Slider.css';
import { ImageType } from '../reducers/types';

type Props = {
  images: Array<ImageType>,
  selectedImage: ImageType,
  changeSelected: ImageType => void
};

function Slides(props: Props) {
  const { images, changeSelected, selectedImage } = props;
  console.log(selectedImage);
  return (
    <div className="slider">
      {images.map((image, i) => (
        <img
          src={image.path}
          alt={`slide ${i}`}
          className={`${selectedImage.id === image.id ? 'selected' : ''} slide`}
          onClick={() => changeSelected(i)}
        />
      ))}
    </div>
  );
}

export default Slides;
