import { CourseType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import CourseRepository from '../db/RepositoryInitializer';

export const ADD_COURSE = 'ADD_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const FETCH_ALL_COURSES = 'FETCH_ALL_COURSES';

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

type FetchAllCoursesAction = {
  type: typeof FETCH_ALL_COURSES;
  payload: {
    courses: Array<CourseType>;
  };
};

export type CourseActionCreatorType = {
  addCourseDb?: (courseData: Omit<CourseType, 'id'>) => unknown;
  removeCourseDb?: (courseId: CourseType['id']) => unknown;
  updateCourseDb?: (courseData: CourseType) => unknown;
  fetchAllCoursesDb?: () => unknown;
};

export type CourseActionType =
  | AddCourseAction
  | RemoveCourseAction
  | UpdateCourseAction
  | FetchAllCoursesAction;

export function addCourse(courseData: CourseType) {
  return {
    type: ADD_COURSE,
    payload: courseData
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

export function fetchAllCourses(coursesData: Array<CourseType>) {
  return {
    type: FETCH_ALL_COURSES,
    payload: {
      courses: coursesData
    }
  };
}

export function addCourseDb(courseData: Omit<CourseType, 'id'>) {
  return (dispatch: Dispatch) => {
    CourseRepository.createEntity(courseData)
      .then(updatedData =>
        dispatch(addCourse(Object.assign(courseData, updatedData)))
      )
      .catch(err => {
        console.log(err);
      });
  };
}

export function removeCourseDb(courseId: CourseType['id']) {
  return (dispatch: Dispatch) => {
    CourseRepository.deleteEntity(courseId)
      .then(() => dispatch(removeCourse(courseId)))
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchAllCoursesDb() {
  return (dispatch: Dispatch) => {
    CourseRepository.getAllCourses()
      .then((courses: Array<CourseType>) => {
        return dispatch(fetchAllCourses(courses));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updateCourseDb(courseData: CourseType) {
  return (dispatch: Dispatch) => {
    CourseRepository.updateEntity(courseData)
      .then(() => dispatch(updateCourse(courseData)))
      .catch(err => {
        console.log(err);
      });
  };
}
