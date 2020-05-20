/* eslint-disable @typescript-eslint/no-explicit-any */
import { allcourses } from '../../normalized-state';

import {
  ADD_COURSE,
  REMOVE_COURSE,
  UPDATE_COURSE,
  CourseActionType
} from '../../actions/courses';

import {
  ADD_SECTION,
  REMOVE_SECTION,
  SectionActionType
} from '../../actions/sections';

export default function courses(
  state = allcourses,
  action: CourseActionType | SectionActionType
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

    case ADD_SECTION:
      if (
        action.payload &&
        action.payload.courseId &&
        action.payload.sectionId
      ) {
        const sectionlist: Array<string> =
          newState[action.payload.courseId].sections;
        sectionlist.push(action.payload.sectionId);
        newState[action.payload.courseId].sections = sectionlist;
      }
      return newState;

    case REMOVE_SECTION:
      if (
        action.payload &&
        action.payload.courseId &&
        action.payload.sectionId
      ) {
        const sectionlist: Array<string> =
          newState[action.payload.courseId].sections;
        const index = sectionlist.indexOf(action.payload.sectionId);
        if (index > -1) sectionlist.splice(index, 1);
        newState[action.payload.courseId].sections = sectionlist;
      }
      return newState;

    default:
      return state;
  }
}
