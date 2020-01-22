// @flow

export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export function addImage(images: Array<string>) {
  return {
    type: ADD_IMAGE,
    images
  };
}

export function deleteImage(id: string) {
  return {
    type: DELETE_IMAGE,
    id
  };
}
