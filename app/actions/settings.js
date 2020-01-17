// @flow

export const CHANGE_SCALE = 'CHANGE_SCALE';
export const CHANGE_SPEED = 'CHANGE_SPEED';

export function changeScale(scale: number) {
  return {
    type: CHANGE_SCALE,
    scale
  };
}

export function changeSpeed(speed: number) {
  return {
    type: CHANGE_SPEED,
    speed
  };
}
