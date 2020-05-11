import { Action } from 'redux';
import { allchapters } from '../../normalized-state';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function chapter(state = allchapters, _action: Action<string>) {
  return state;
}
