export const ADD_COURSE = 'ADD_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';

type CourseProps = {
  id?: string;
  title: string;
  description?: string;
  chapters?: Array<string>;
  videos?: Array<string>;
  duration?: string;
  thumbnail?: string;
};

type AddCourseAction = {
  type: typeof ADD_COURSE;
  payload: CourseProps;
};

type RemoveCourseAction = {
  type: typeof REMOVE_COURSE;
  payload: CourseProps['id'];
};

export type CourseActionType = AddCourseAction | RemoveCourseAction;

export function addCourse(courseData: CourseProps) {
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

export function removeCourse(courseId: CourseProps['id']) {
  return {
    type: REMOVE_COURSE,
    payload: courseId
  };
}
