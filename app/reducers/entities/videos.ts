/* eslint-disable @typescript-eslint/no-explicit-any */
import { allvideos } from '../../normalized-state';

import {
  ADD_VIDEO,
  REMOVE_VIDEO,
  VideoActionType,
  TOGGLE_WATCHED,
  FETCH_VIDEOS_BY_SECTION
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

    case TOGGLE_WATCHED:
      if (action.payload && action.payload.videoId) {
        const updatedVideo = newState[action.payload.videoId];
        const val = newState[action.payload.videoId].watched;
        if (val) updatedVideo.watched = false;
        else updatedVideo.watched = true;
        newState[action.payload.videoId] = updatedVideo;
      }
      return newState;

    case FETCH_VIDEOS_BY_SECTION:
      if (action.payload && action.payload.videos) {
        action.payload.videos.forEach(video => {
          if (video.id) newState[video.id] = video;
        });
      }
      return newState;

    default:
      return state;
  }
}
