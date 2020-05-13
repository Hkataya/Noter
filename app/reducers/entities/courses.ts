import { allcourses } from '../../normalized-state';

import {
  ADD_COURSE,
  REMOVE_COURSE,
  CourseActionType
} from '../../actions/courses';

export default function courses(state = allcourses, action: CourseActionType) {
  const newState = { ...state };
  switch (action.type) {
    case ADD_COURSE:
      if (action.payload.id) newState[action.payload.id] = action.payload;
      return newState;

    case REMOVE_COURSE:
      // Temporary solution ... deleting will only remove references but the data is still cached
      // Might look into alternative solutions (such as tracking data)
      if (action.payload) delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
