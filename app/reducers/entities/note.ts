/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action } from 'redux';
import { allnotes } from '../../normalized-state';

export default function note(state = allnotes, _action: Action<string>) {
  return state;
}
