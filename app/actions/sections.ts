import { SectionType, CourseType } from '../reducers/entities/types';

export const ADD_SECTION = 'ADD_SECTION';
export const REMOVE_SECTION = 'REMOVE_SECTION';

type addSectionAction = {
  type: typeof ADD_SECTION;
  payload: {
    courseId: CourseType['id'];
    sectionId: SectionType['id'];
    sectionData: SectionType;
  };
};

type removeSectionAction = {
  type: typeof REMOVE_SECTION;
  payload: {
    sectionId: SectionType['id'];
    courseId: CourseType['id'];
  };
};

export type SectionActionCreatorType = {
  addSection?: (sectionData: SectionType, courseId: CourseType['id']) => void;
  removeSection?: (
    sectionId: SectionType['id'],
    courseId: CourseType['id']
  ) => void;
};

export type SectionActionType = addSectionAction | removeSectionAction;

export function addSection(
  sectionData: SectionType,
  courseId: CourseType['id']
) {
  // Generate Unique ID
  const sectionId = Date.now().toString();
  const section = {
    id: sectionId,
    ...sectionData
  };
  return {
    type: ADD_SECTION,
    payload: {
      courseId,
      sectionId,
      sectionData: section
    }
  };
}

export function removeSection(
  sectionId: SectionType['id'],
  courseId: CourseType['id']
) {
  return {
    type: REMOVE_SECTION,
    payload: {
      sectionId,
      courseId
    }
  };
}
