import {
  CourseType,
  SectionType,
  NoteType,
  VideoType
} from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import { courseRepository as CourseRepository } from '../db/RepositoryInitializer';
import { showAlert } from './ui';
import AlertStatusTypes from '../constants/alert-types.json';

export const ADD_COURSE = 'ADD_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const FETCH_ALL_COURSES = 'FETCH_ALL_COURSES';
export const FETCH_COURSE_CONTENT = 'FETCH_COURSE_CONTENT';

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

type FetchedCourseData = {
  sections: Array<SectionType>;
  notes: Array<NoteType>;
  videos: Array<VideoType>;
};

type FetchCourseContentAction = {
  type: typeof FETCH_COURSE_CONTENT;
  payload: {
    data: FetchedCourseData;
  };
};

export type CourseActionCreatorType = {
  addCourseDb?: (courseData: Omit<CourseType, 'id'>) => unknown;
  removeCourseDb?: (courseId: CourseType['id']) => unknown;
  updateCourseDb?: (courseData: CourseType) => unknown;
  fetchAllCoursesDb?: () => unknown;
  fetchCourseContentDb?: (courseId: CourseType['id']) => unknown;
};

export type CourseActionType =
  | AddCourseAction
  | RemoveCourseAction
  | UpdateCourseAction
  | FetchAllCoursesAction
  | FetchCourseContentAction;

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

export function fetchCourseContent(data: FetchedCourseData) {
  return {
    type: FETCH_COURSE_CONTENT,
    payload: {
      data
    }
  };
}

export function addCourseDb(courseData: Omit<CourseType, 'id'>) {
  return (dispatch: Dispatch) => {
    CourseRepository.createEntity(courseData)
      .then(updatedData => {
        dispatch<any>(
          showAlert(AlertStatusTypes.INFO, 'Course Added Successfully')
        );
        return dispatch(addCourse(Object.assign(courseData, updatedData)));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function removeCourseDb(courseId: CourseType['id']) {
  return (dispatch: Dispatch) => {
    CourseRepository.deleteEntity(courseId)
      .then(() => {
        dispatch<any>(
          showAlert(AlertStatusTypes.INFO, 'Course Removed Successfully')
        );
        return dispatch(removeCourse(courseId));
      })
      .catch(err => {
        dispatch<any>(
          showAlert(AlertStatusTypes.ERROR, 'Error In Revoming Course')
        );
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
      .then(updatedData => {
        dispatch<any>(
          showAlert(AlertStatusTypes.INFO, 'Course Updated Successfully')
        );
        return dispatch(updateCourse(Object.assign(courseData, updatedData)));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchCourseContentDb(courseId: CourseType['id']) {
  return (dispatch: Dispatch) => {
    CourseRepository.getCourseContent(courseId)
      .then((data: FetchedCourseData) => {
        return dispatch(fetchCourseContent(data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
