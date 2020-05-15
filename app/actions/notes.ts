import { VideoType, NoteType } from '../reducers/entities/types';

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

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

export type NoteActionCreatorType = {
  addNote?: (noteData: NoteType, videoId: VideoType['id']) => void;
  removeNote?: (noteId: NoteType['id'], courseId: VideoType['id']) => void;
};

export type NoteActionType = AddNoteAction | RemoveNoteAction;

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
