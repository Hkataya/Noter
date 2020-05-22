import { ModalType } from '../reducers/ui/types';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_CURRENTLY_SELECTED = 'SET_CURRENTLY_SELECTED';

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

export type UIActionCreatorType = {
  openModal?: (
    data: ModalType['data'],
    type: ModalType['type'],
    parentId: ModalType['parentId']
  ) => void;
  closeModal?: () => void;
  setCurrentlySelected?: (id: string) => void;
};

export type UIActionType =
  | OpenModalAction
  | CloseModalAction
  | SetCurrentlySelected;

export function openModal(
  data: OpenModalAction['payload']['data'],
  type: OpenModalAction['payload']['type'],
  parentId: OpenModalAction['payload']['parentId']
) {
  return {
    type: OPEN_MODAL,
    payload: {
      type,
      data,
      parentId
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
