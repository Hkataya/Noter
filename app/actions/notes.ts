/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// import { Dispatch } from 'react';
import { NoteType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import { createNote, deleteNote } from '../db/db';

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
    createNote(noteData)
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
    deleteNote(noteId)
      .then(() => dispatch(removeNote(noteId)))
      .catch(err => {
        console.log(err);
      });
  };
}
