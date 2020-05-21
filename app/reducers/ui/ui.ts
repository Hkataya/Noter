import { OPEN_MODAL, CLOSE_MODAL, UIActionType } from '../../actions/ui';

const initialState = {
  modal: {
    visible: false,
    type: '',
    data: {},
    parentId: ''
  }
};

export default function ui(state = initialState, action: UIActionType) {
  const newState = { ...state };
  switch (action.type) {
    case OPEN_MODAL:
      newState.modal = {
        visible: true,
        type: action.payload.type,
        data: action.payload.data || {},
        parentId: action.payload.parentId || ''
      };
      return newState;

    case CLOSE_MODAL:
      newState.modal = initialState.modal;
      return newState;

    default:
      return state;
  }
}
