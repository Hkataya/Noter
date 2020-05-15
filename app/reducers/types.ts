import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { CourseType, VideoType } from './entities/types';

export type counterStateType = {
  counter: number;
};

export type EntityStateType = {
  courses: Record<string, CourseType>;
  videos: Record<string, VideoType>;
};
export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<counterStateType, Action<string>>;
