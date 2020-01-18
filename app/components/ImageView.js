import React from 'react';
import Style from './imageView.scss';

type Props = {
  selectedImage: { path: string, id: string }
};

function ImageView(props: Props) {
  const { selectedImage } = props;
  const { path } = selectedImage;
  return (
    <div className={Style.ImageView}>
      {path ? <img src={path} alt="Viewport" /> : ''}
    </div>
  );
}

export default ImageView;
