import { CourseType } from '../reducers/entities/types';

export const ADD_COURSE = 'ADD_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';

type AddCourseAction = {
  type: typeof ADD_COURSE;
  payload: CourseType;
};

type RemoveCourseAction = {
  type: typeof REMOVE_COURSE;
  payload: CourseType['id'];
};

type UpdateCourseAction = {
  type: typeof UPDATE_COURSE;
  payload: CourseType;
};

export type CourseActionCreatorType = {
  addCourse?: (courseData: CourseType) => void;
  removeCourse?: (courseId: CourseType['id']) => void;
  updateCourse?: (courseData: CourseType) => void;
};

export type CourseActionType =
  | AddCourseAction
  | RemoveCourseAction
  | UpdateCourseAction;

export function addCourse(courseData: CourseType) {
  // Generate Unique ID
  const courseId = Date.now().toString();
  const course = {
    id: courseId,
    ...courseData
  };
  return {
    type: ADD_COURSE,
    payload: course
  };
}

export function removeCourse(courseId: CourseType['id']) {
  return {
    type: REMOVE_COURSE,
    payload: courseId
  };
}

export function updateCourse(courseData: CourseType) {
  return {
    type: UPDATE_COURSE,
    payload: courseData
  };
}
