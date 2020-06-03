/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// import { Dispatch } from 'react';
import { VideoType, NoteType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import { updateNote, createNote, deleteNote } from '../db/db';

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
type AddNoteAction = {
  type: typeof ADD_NOTE;
  payload: {
    noteId: NoteType['id'];
    videoId: VideoType['id'];
    noteData: NoteType;
  };
};

type RemoveNoteAction = {
  type: typeof REMOVE_NOTE;
  payload: {
    videoId: VideoType['id'];
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
  addNote?: (noteData: NoteType, videoId: VideoType['id']) => void;
  removeNote?: (noteId: NoteType['id'], videoId: VideoType['id']) => void;
};

export type NoteActionType = AddNoteAction | RemoveNoteAction;

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
  return {
    type: ADD_NOTE,
    payload: {
      noteId,
      videoId,
      noteData: note
    }
  };
}

export function removeNote(noteId: NoteType['id'], videoId: VideoType['id']) {
  return {
    type: REMOVE_NOTE,
    payload: {
      noteId,
      videoId
    }
  };
}
export function addNoteDb(noteData: NoteType, videoId: VideoType['id']) {
  return (dispatch: Dispatch) => {
    createNote(noteData)
      .then((updatedData: any) => {
        Object.assign(noteData, updatedData);
        return dispatch(addNote(noteData, videoId));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
export function removeNoteDb(noteId: NoteType['id'], videoId: VideoType['id']) {
  return (dispatch: Dispatch) => {
    deleteNote(noteId)
      .then((res: any) => {
        if (res) return dispatch(removeNote(noteId, videoId));
        return null;
      })
      .catch((err: any) => {
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
