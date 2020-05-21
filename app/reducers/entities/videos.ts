/* eslint-disable @typescript-eslint/no-explicit-any */
import { allvideos } from '../../normalized-state';

import {
  ADD_VIDEO,
  REMOVE_VIDEO,
  VideoActionType,
  TOGGLE_WATCHED
} from '../../actions/videos';
import { ADD_NOTE, REMOVE_NOTE, NoteActionType } from '../../actions/notes';

export default function videos(
  state = allvideos,
  action: VideoActionType | NoteActionType
) {
  const newState: any = { ...state };
  switch (action.type) {
    case ADD_VIDEO:
      if (action.payload && action.payload.videoId)
        newState[action.payload.videoId] = action.payload.videoData;
      return newState;

    case REMOVE_VIDEO:
      if (action.payload && action.payload.videoId)
        delete newState[action.payload.videoId];
      return newState;

    case ADD_NOTE:
      if (action.payload && action.payload.noteId && action.payload.videoId) {
        const noteList: Array<string> = newState[action.payload.videoId].notes;
        noteList.push(action.payload.noteId);
        newState[action.payload.videoId].notes = noteList;
      }
      return newState;

    case REMOVE_NOTE:
      if (action.payload && action.payload.videoId && action.payload.noteId) {
        const noteList: Array<string> = newState[action.payload.videoId].notes;
        const index = noteList.indexOf(action.payload.noteId);
        if (index > -1) noteList.splice(index, 1);
        newState[action.payload.videoId].notes = noteList;
      }
      return newState;

    case TOGGLE_WATCHED:
      if (action.payload && action.payload.videoId) {
        const updatedVideo = newState[action.payload.videoId];
        const val = newState[action.payload.videoId].watched;
        if (val) updatedVideo.watched = false;
        else updatedVideo.watched = true;
        newState[action.payload.videoId] = updatedVideo;
      }
      return newState;

    default:
      return state;
  }
}
