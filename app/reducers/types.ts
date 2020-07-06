import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { CourseType, VideoType, NoteType, SectionType } from './entities/types';
import { ModalType, AlertType } from './ui/types';

export type EntityStateType = {
  courses: Record<string, CourseType>;
  videos: Record<string, VideoType>;
  notes: Record<string, NoteType>;
  sections: Record<string, SectionType>;
};

export type UIStateType = {
  modal: ModalType;
  alert: AlertType;
  currentlySelected: string;
  currentTimestamp: string;
  targetTimestamp: string;
};

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<any, Action<string>>;
