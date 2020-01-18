/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow

import React, { Component } from 'react';
import './Slider.css';

type Props = {
  images: Array<{ id: string, path: string }>,
  selectedImage: { id: string, path: string },
  selectImage: () => void
};

type State = {
  selectedIndex: number
};

class Slides extends Component<Props, State> {
  render() {
    const { images, selectImage, selectedImage }: Props = this.props;
    console.log(selectedImage);
    return (
      <div className="slider">
        {images.map((image, i) => (
          <img
            src={image.path}
            alt={`slide ${i}`}
            className={`${
              selectedImage.id === image.id ? 'selected' : ''
            } slide`}
            onClick={() => selectImage(image)}
          />
        ))}
      </div>
    );
  }
}

export default Slides;
