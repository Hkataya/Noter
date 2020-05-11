import { Action } from 'redux';
import { allcourses } from '../../normalized-state';

export default function course(state = allcourses, action: Action<string>) {
  return state;
}
