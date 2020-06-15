import { ModalType } from '../reducers/ui/types';
import { NoteType } from '../reducers/entities/types';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_CURRENTLY_SELECTED = 'SET_CURRENTLY_SELECTED';
export const SET_CURRENT_TIMESTAMP = 'SET_CURRENT_TIMESTAMP';
export const SET_TARGET_TIMESTAMP = 'SET_TARGET_TIMESTAMP';

type SetCurrentlySelected = {
  type: typeof SET_CURRENTLY_SELECTED;
  payload: string;
};

type OpenModalAction = {
  type: typeof OPEN_MODAL;
  payload: ModalType;
};

type CloseModalAction = {
  type: typeof CLOSE_MODAL;
};

type SetCurrentTimestampAction = {
  type: typeof SET_CURRENT_TIMESTAMP;
  payload: NoteType['timestamp'];
};

type SetTargetTimestampAction = {
  type: typeof SET_TARGET_TIMESTAMP;
  payload: NoteType['timestamp'];
};

export type UIActionCreatorType = {
  openModal?: (
    data: ModalType['data'],
    parentId?: ModalType['parentId'],
    type?: ModalType['type']
  ) => void;
  closeModal?: () => void;
  setCurrentlySelected?: (id: string) => void;
  setCurrentTimestamp?: (time: NoteType['timestamp']) => void;
  setTargetTimestamp?: (time: NoteType['timestamp']) => void;
};

export type UIActionType =
  | OpenModalAction
  | CloseModalAction
  | SetCurrentlySelected
  | SetCurrentTimestampAction
  | SetTargetTimestampAction;

export function openModal(
  data: OpenModalAction['payload']['data'],
  parentId: OpenModalAction['payload']['parentId'],
  type: OpenModalAction['payload']['type']
) {
  return {
    type: OPEN_MODAL,
    payload: {
      data,
      parentId,
      type
    }
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}

export function setCurrentlySelected(id: string) {
  return {
    type: SET_CURRENTLY_SELECTED,
    payload: id
  };
}

export function setCurrentTimestamp(time: NoteType['timestamp']) {
  return {
    type: SET_CURRENT_TIMESTAMP,
    payload: time
  };
}

export function setTargetTimestamp(time: NoteType['timestamp']) {
  return {
    type: SET_TARGET_TIMESTAMP,
    payload: time
  };
}
