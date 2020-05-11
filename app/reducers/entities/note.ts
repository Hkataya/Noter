import { Action } from 'redux';
import { allnotes } from '../../normalized-state';

export default function note(state = allnotes, action: Action<string>) {
  return state;
}
