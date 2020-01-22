import React from 'react';
import Style from './imageView.scss';
import { ImageType } from '../reducers/types';

type Props = {
  selectedImage: ImageType,
  deleteImage: string => void
};

function ImageView(props: Props) {
  const { selectedImage, deleteImage } = props;
  const { path, id } = selectedImage;
  if (id) {
    return (
      <div className={Style.ImageView}>
        {path ? <img src={path} alt="Viewport" /> : ''}
        <button type="button" onClick={() => deleteImage(id)}>
          <i className="fa fa-times fa-3x" />
        </button>
      </div>
    );
  }
  return <div className={Style.ImageView} />;
}

export default ImageView;
