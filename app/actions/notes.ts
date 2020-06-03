import { NoteType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
<<<<<<< HEAD
import { updateNote, createNote, deleteNote } from '../db/db';
=======
import NoteRepository from '../db/NoteRepository';
>>>>>>> 5e330a867a9beb46a12d4e7026bc6090adf42228

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
type AddNoteAction = {
  type: typeof ADD_NOTE;
  payload: {
    noteId: NoteType['id'];
    noteData: NoteType;
  };
};

type RemoveNoteAction = {
  type: typeof REMOVE_NOTE;
  payload: {
    noteId: NoteType['id'];
  };
};
type UpdateNoteAction = {
  type: typeof UPDATE_NOTE;
  payload: {
    noteId: NoteType['id'];
    noteData: NoteType;
  };
};
export type NoteActionCreatorType = {
  addNoteDb?: (noteData: Omit<NoteType, 'id'>) => unknown;
  removeNoteDb?: (noteId: NoteType['id']) => unknown;
};

export type NoteActionType = AddNoteAction | RemoveNoteAction;

<<<<<<< HEAD
export function UpdateNote(noteData: NoteType, noteId: NoteType['id']) {
  return {
    type: UPDATE_NOTE,
    payload: {
      noteData
    }
  };
}

export function addNote(noteData: NoteType, videoId: VideoType['id']) {
  // Generate Unique ID
  const noteId = Date.now().toString();
  const note = {
    id: noteId,
    ...noteData
  };
=======
function addNote(noteData: NoteType) {
  const noteId = noteData.id;
>>>>>>> 5e330a867a9beb46a12d4e7026bc6090adf42228
  return {
    type: ADD_NOTE,
    payload: {
      noteId,
      noteData
    }
  };
}

function removeNote(noteId: NoteType['id']) {
  return {
    type: REMOVE_NOTE,
    payload: {
      noteId
    }
  };
}
export function addNoteDb(noteData: Omit<NoteType, 'id'>) {
  return (dispatch: Dispatch) => {
    NoteRepository.createEntity(noteData)
      .then(updatedData =>
        dispatch(addNote(Object.assign(noteData, updatedData)))
      )
      .catch(err => {
        console.log(err);
      });
  };
}
export function removeNoteDb(noteId: NoteType['id']) {
  return (dispatch: Dispatch) => {
    NoteRepository.deleteEntity(noteId)
      .then(() => dispatch(removeNote(noteId)))
      .catch(err => {
        console.log(err);
      });
  };
}
export function updateNoteDb(noteId: NoteType['id'], noteData: NoteType) {
  return (dispatch: Dispatch) => {
    updateNote(noteId, noteData)
      .then((updatedData: any) => {
        Object.assign(noteData, updatedData);
        return dispatch(updateNote(noteId, noteData));x
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
