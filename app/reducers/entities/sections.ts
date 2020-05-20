/* eslint-disable @typescript-eslint/no-explicit-any */
import { allsections } from '../../normalized-state';

import {
  ADD_SECTION,
  REMOVE_SECTION,
  SectionActionType
} from '../../actions/sections';
import { ADD_VIDEO, REMOVE_VIDEO, VideoActionType } from '../../actions/videos';

export default function sections(
  state = allsections,
  action: VideoActionType | SectionActionType
) {
  const newState: any = { ...state };
  switch (action.type) {
    case ADD_SECTION:
      if (action.payload && action.payload.sectionId)
        newState[action.payload.sectionId] = action.payload.sectionData;
      return newState;

    case REMOVE_SECTION:
      if (action.payload && action.payload.sectionId)
        delete newState[action.payload.sectionId];
      return newState;

    case ADD_VIDEO:
      if (
        action.payload &&
        action.payload.videoId &&
        action.payload.sectionId
      ) {
        const videoList: Array<string> =
          newState[action.payload.sectionId].videos;
        videoList.push(action.payload.videoId);
        newState[action.payload.sectionId].videos = videoList;
      }
      return newState;

    case REMOVE_VIDEO:
      if (
        action.payload &&
        action.payload.videoId &&
        action.payload.sectionId
      ) {
        const videoList: Array<string> =
          newState[action.payload.sectionId].videos;
        const index = videoList.indexOf(action.payload.videoId);
        if (index > -1) videoList.splice(index, 1);
        newState[action.payload.sectionId].videos = videoList;
      }
      return newState;

    default:
      return state;
  }
}
