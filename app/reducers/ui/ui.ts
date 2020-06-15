import {
  OPEN_MODAL,
  CLOSE_MODAL,
  UIActionType,
  SET_CURRENTLY_SELECTED,
  SET_CURRENT_TIMESTAMP,
  SET_TARGET_TIMESTAMP
} from '../../actions/ui';

const initialState = {
  modal: {
    visible: false,
    data: {},
    parentId: '',
    type: ''
  },
  currentlySelected: '',
  currentTimestamp: '',
  targetTimestamp: ''
};

export default function ui(state = initialState, action: UIActionType) {
  const newState = { ...state };
  switch (action.type) {
    case OPEN_MODAL:
      newState.modal = {
        visible: true,
        data: action.payload.data || {},
        parentId: action.payload.parentId || '',
        type: action.payload.type || ''
      };
      return newState;

    case CLOSE_MODAL:
      newState.modal = initialState.modal;
      return newState;

    case SET_CURRENTLY_SELECTED:
      newState.currentlySelected = action.payload;
      return newState;

    case SET_CURRENT_TIMESTAMP:
      newState.currentTimestamp = action.payload;
      return newState;

    case SET_TARGET_TIMESTAMP:
      newState.targetTimestamp = action.payload;
      return newState;

    default:
      return state;
  }
}
