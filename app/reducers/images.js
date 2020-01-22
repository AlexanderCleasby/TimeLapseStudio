// @flow
import uuid from 'uuid';
import { ADD_IMAGE, DELETE_IMAGE } from '../actions/images';
import type { Action, ImageType } from './types';

export default function images(state: Array<ImageType> = [], action: Action) {
  switch (action.type) {
    case ADD_IMAGE: {
      const newImages = action.images.map(path => ({ id: uuid(), path }));
      return [...state, ...newImages];
    }
    case DELETE_IMAGE:
      return [...state.filter((image: ImageType) => image.id !== action.id)];
    default:
      return state;
  }
}
