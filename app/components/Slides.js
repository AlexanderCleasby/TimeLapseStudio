/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow

import React, { Component } from 'react';
import './Slider.css';

type Props = {
  images: Array<{ id: string, path: string }>
};

type State = {
  selectedIndex: number
};

class Slides extends Component<Props, State> {
  constructor() {
    super();
    this.state = { selectedIndex: 0 };
  }

  selectedChange = (i: number) => {
    this.setState({ selectedIndex: i });
  };

  render() {
    const { images }: Props = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className="slider">
        {images.map((image, i) => (
          <img
            src={image.path}
            alt={`slide ${i}`}
            className={`slide ${selectedIndex ? 'selected' : ''}`}
            onClick={() => this.selectedChange(i)}
          />
        ))}
      </div>
    );
  }
}

export default Slides;
