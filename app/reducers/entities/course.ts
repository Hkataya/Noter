/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action } from 'redux';
import { allcourses } from '../../normalized-state';

export default function course(state = allcourses, _action: Action<string>) {
  return state;
}
