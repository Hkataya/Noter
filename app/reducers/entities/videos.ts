/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action } from 'redux';
import { allvideos } from '../../normalized-state';

export default function videos(state = allvideos, _action: Action<string>) {
  return state;
}
