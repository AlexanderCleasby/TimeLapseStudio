// @flow

export const ADD_IMAGE = 'INCREMENT_COUNTER';
export const DELETE_IMAGE = 'DECREMENT_COUNTER';

export function addImage(images: Array<string>) {
  return {
    type: ADD_IMAGE,
    images
  };
}

export function deleteImage() {
  return {
    type: DELETE_IMAGE
  };
}
