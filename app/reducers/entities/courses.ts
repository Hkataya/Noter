/* eslint-disable @typescript-eslint/no-explicit-any */
import { allcourses } from '../../normalized-state';

import {
  ADD_COURSE,
  REMOVE_COURSE,
  UPDATE_COURSE,
  CourseActionType
} from '../../actions/courses';

import { ADD_VIDEO, REMOVE_VIDEO, VideoActionType } from '../../actions/videos';

export default function courses(
  state = allcourses,
  action: CourseActionType | VideoActionType
) {
  const newState: any = { ...state };
  switch (action.type) {
    case ADD_COURSE:
      if (action.payload && action.payload.id)
        newState[action.payload.id] = action.payload;

      return newState;

    case REMOVE_COURSE:
      // Temporary solution ... deleting will only remove references but the data is still cached
      // Might look into alternative solutions (such as tracking data)
      if (action.payload) delete newState[action.payload];
      return newState;

    case UPDATE_COURSE:
      if (action.payload && action.payload.id)
        newState[action.payload.id] = action.payload;
      return newState;

    case ADD_VIDEO:
      if (action.payload && action.payload.courseId && action.payload.videoId) {
        const videolist: Array<string> =
          newState[action.payload.courseId].videos;
        videolist.push(action.payload.videoId);
        newState[action.payload.courseId].videos = videolist;
      }
      return newState;

    case REMOVE_VIDEO:
      if (action.payload && action.payload.courseId && action.payload.videoId) {
        const videolist: Array<string> =
          newState[action.payload.courseId].videos;
        const index = videolist.indexOf(action.payload.videoId);
        if (index > -1) videolist.splice(index, 1);
        newState[action.payload.courseId].videos = videolist;
      }
      return newState;

    default:
      return state;
  }
}
