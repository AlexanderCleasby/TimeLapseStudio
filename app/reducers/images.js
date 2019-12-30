// @flow
import uuid from 'uuid';
import { ADD_IMAGE, DELETE_IMAGE } from '../actions/images';
import type { Action } from './types';

export default function images(
  state: Array<{ id: string, path: string }> = [],
  action: Action
) {
  switch (action.type) {
    case ADD_IMAGE: {
      const newImages = action.images.map(path => ({ id: uuid(), path }));
      return [...state, ...newImages];
    }
    case DELETE_IMAGE:
      return [state];
    default:
      return state;
  }
}
