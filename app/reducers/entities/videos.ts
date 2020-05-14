/* eslint-disable @typescript-eslint/no-explicit-any */
import { allvideos } from '../../normalized-state';

import { ADD_VIDEO, REMOVE_VIDEO, VideoActionType } from '../../actions/videos';

export default function videos(state = allvideos, action: VideoActionType) {
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

    default:
      return state;
  }
}
