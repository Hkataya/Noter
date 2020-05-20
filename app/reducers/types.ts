import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { CourseType, VideoType, NoteType, SectionType } from './entities/types';

export type counterStateType = {
  counter: number;
};

export type EntityStateType = {
  courses: Record<string, CourseType>;
  videos: Record<string, VideoType>;
  notes: Record<string, NoteType>;
  sections: Record<string, SectionType>;
};
export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<counterStateType, Action<string>>;
