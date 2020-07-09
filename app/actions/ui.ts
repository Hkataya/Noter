import { ModalType, AlertType } from '../reducers/ui/types';
import { NoteType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_CURRENTLY_SELECTED = 'SET_CURRENTLY_SELECTED';
export const SET_CURRENT_TIMESTAMP = 'SET_CURRENT_TIMESTAMP';
export const SET_TARGET_TIMESTAMP = 'SET_TARGET_TIMESTAMP';
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

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

type ShowAlertAction = {
  type: typeof SHOW_ALERT;
  payload: AlertType;
};

type HideAlertAction = {
  type: typeof HIDE_ALERT;
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
  showAlert?: (
    status: AlertType['status'],
    message: AlertType['message']
  ) => void;
  hideAlert?: () => void;
};

export type UIActionType =
  | OpenModalAction
  | CloseModalAction
  | SetCurrentlySelected
  | SetCurrentTimestampAction
  | SetTargetTimestampAction
  | ShowAlertAction
  | HideAlertAction;

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

function showAlertSync(
  status: ShowAlertAction['payload']['status'],
  message: ShowAlertAction['payload']['message']
) {
  return {
    type: SHOW_ALERT,
    payload: {
      status,
      message
    }
  };
}

function hideAlert() {
  return {
    type: HIDE_ALERT
  };
}

export function showAlert(
  status: ShowAlertAction['payload']['status'],
  message: ShowAlertAction['payload']['message']
) {
  return (dispatch: Dispatch) => {
    dispatch(showAlertSync(status, message));
    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  };
}
