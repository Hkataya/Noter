import { Action } from 'redux';
import { allvideos } from '../../normalized-state';

export default function video(state = allvideos, action: Action<string>) {
  return state;
}
