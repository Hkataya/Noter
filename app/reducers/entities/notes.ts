/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ADD_NOTE,
  REMOVE_NOTE,
  NoteActionType,
  UPDATE_NOTE,
  FETCH_NOTES_BY_VIDEO
} from '../../actions/notes';

export default function notes(state = {}, action: NoteActionType) {
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

    case UPDATE_NOTE:
      if (action.payload && action.payload.noteData.id)
        newState[action.payload.noteData.id] = action.payload.noteData;
      return newState;

    case FETCH_NOTES_BY_VIDEO:
      if (action.payload && action.payload.notes) {
        action.payload.notes.forEach(note => {
          if (note.id) newState[note.id] = note;
        });
      }
      return newState;

    default:
      return state;
  }
}
