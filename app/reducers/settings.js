import { CHANGE_SCALE, CHANGE_SPEED } from '../actions/settings';

export default function settings(
  state: { speed: number, scale: number } = { speed: 500, scale: 1 },
  action
) {
  switch (action.type) {
    case CHANGE_SCALE:
      return { ...state, scale: action.scale };
    case CHANGE_SPEED:
      return { ...state, speed: action.speed };
    default:
      return state;
  }
}
