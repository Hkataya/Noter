import { Action } from 'redux';
import { allchapters } from '../../normalized-state';

export default function chapter(state = allchapters, action: Action<string>) {
  return state;
}
