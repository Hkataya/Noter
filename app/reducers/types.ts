import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { CourseType } from './entities/types';

export type counterStateType = {
  counter: number;
};

export type EntityStateType = {
  courses: Record<string, CourseType>;
};
export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<counterStateType, Action<string>>;
