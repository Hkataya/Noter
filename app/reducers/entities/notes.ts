/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ADD_NOTE,
  REMOVE_NOTE,
  NoteActionType,
  UPDATE_NOTE,
  FETCH_NOTES_BY_VIDEO
} from '../../actions/notes';

import { FETCH_COURSE_CONTENT, CourseActionType } from '../../actions/courses';

export default function notes(
  state = {},
  action: NoteActionType | CourseActionType
) {
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

    case FETCH_COURSE_CONTENT:
      if (action.payload && action.payload.data && action.payload.data.notes) {
        action.payload.data.notes.forEach((note: any) => {
          newState[note.id] = note;
        });
      }
      return newState;

    default:
      return state;
  }
}
