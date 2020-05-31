import { NoteType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import NoteRepository from '../db/NoteRepository';

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

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

export type NoteActionCreatorType = {
  addNoteDb?: (noteData: NoteType) => void;
  removeNoteDb?: (noteId: NoteType['id']) => void;
};

export type NoteActionType = AddNoteAction | RemoveNoteAction;

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
export function addNoteDb(noteData: NoteType) {
  return (dispatch: Dispatch) => {
    NoteRepository.createEntity(noteData)
      .then(updatedData => {
        Object.assign(noteData, updatedData);
        return dispatch(addNote(noteData));
      })
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
