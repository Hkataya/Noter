/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ADD_COURSE,
  REMOVE_COURSE,
  UPDATE_COURSE,
  CourseActionType,
  FETCH_ALL_COURSES
} from '../../actions/courses';

export default function courses(state = {}, action: CourseActionType) {
  const newState: any = { ...state };
  switch (action.type) {
    case ADD_COURSE:
      if (action.payload && action.payload.id)
        newState[action.payload.id] = action.payload;

      return newState;

    case REMOVE_COURSE:
      if (action.payload) delete newState[action.payload];
      return newState;

    case UPDATE_COURSE:
      if (action.payload && action.payload.id)
        newState[action.payload.id] = action.payload;
      return newState;

    case FETCH_ALL_COURSES:
      if (action.payload && action.payload.courses) {
        action.payload.courses.forEach(course => {
          if (course.id) newState[course.id] = course;
        });
      }

      return newState;

    default:
      return state;
  }
}
