/* eslint-disable @typescript-eslint/no-explicit-any */
import { allnotes } from '../../normalized-state';

import { ADD_NOTE, REMOVE_NOTE, NoteActionType } from '../../actions/notes';

export default function notes(state = allnotes, action: NoteActionType) {
  const newState: any = { ...state };
  switch (action.type) {
    case ADD_NOTE:
      if (action.payload && action.payload.noteId)
        newState[action.payload.noteId] = action.payload.noteData;

      return newState;

    case REMOVE_NOTE:
      if (action.payload && action.payload.noteId)
        delete newState[action.payload.noteId];
      return newState;

    default:
      return state;
  }
}
