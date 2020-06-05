import { NoteType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
// import { updateNote, createNote, deleteNote } from '../db/db';
import NoteRepository from '../db/NoteRepository';

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
  updateNoteDb?: (noteData: NoteType) => unknown;
};

export type NoteActionType =
  | AddNoteAction
  | RemoveNoteAction
  | UpdateNoteAction;

export function updateNote(noteData: NoteType, noteId: NoteType['id']) {
  return {
    type: UPDATE_NOTE,
    payload: {
      noteData
    }
  };
}
function addNote(noteData: NoteType) {
  const noteId = noteData.id;
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

export function updateNoteDb(noteData: NoteType) {
  console.log('updating note', noteData);
  return (dispatch: Dispatch) => {
    NoteRepository.updateEntity(noteData)
      .then(updatedData => dispatch(updateNote(noteData, updatedData.id)))
      .catch((err: any) => {
        console.log(err);
      });
  };
}
