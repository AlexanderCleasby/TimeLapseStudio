// @flow
import uuid from 'uuid';
import { ADD_IMAGE, DELETE_IMAGE, CHANGE_SELECTED } from '../actions/images';
import type { Action, ImageType } from './types';

export default function images(
  state: { all: Array<ImageType>, selected: ImageType } = {
    all: [],
    selected: { id: '', path: '' }
  },
  action: Action
) {
  let newImages;
  let index;
  switch (action.type) {
    case ADD_IMAGE: {
      newImages = action.images.map(path => ({ id: uuid(), path }));
      return { ...state, all: [...state.all, ...newImages] };
    }
    case DELETE_IMAGE:
      index = state.all.findIndex(image => image.id === action.id);
      if (state.all.length === 1) {
        return {
          all: [],
          selected: { id: '', path: '' }
        };
      }
      return {
        selected: index > 0 ? state.all[index - 1] : state.all[1],
        all: [...state.all.filter((image: ImageType) => image.id !== action.id)]
      };
    case CHANGE_SELECTED:
      return {
        ...state,
        selected: state.all[action.index]
      };
    default:
      return state;
  }
}
