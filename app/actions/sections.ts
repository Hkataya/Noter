import { SectionType, CourseType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import SectionRepository from '../db/SectionRepository';

export const ADD_SECTION = 'ADD_SECTION';
export const REMOVE_SECTION = 'REMOVE_SECTION';
export const FETCH_SECTIONS_BY_COURSE = 'FETCH_SECTIONS_BY_COURSE';
export const UPDATE_SECTION = 'UPDATE_SECTION';
type addSectionAction = {
  type: typeof ADD_SECTION;
  payload: {
    courseId: CourseType['id'];
    sectionId: SectionType['id'];
    sectionData: SectionType;
  };
};
type updateSection = {
  type: typeof UPDATE_SECTION;
  payload: {
    sectionId: SectionType['id'];
    sectionData: SectionType;
  };
};
type removeSectionAction = {
  type: typeof REMOVE_SECTION;
  payload: {
    sectionId: SectionType['id'];
  };
};

type FetchSectionsByCourseAction = {
  type: typeof FETCH_SECTIONS_BY_COURSE;
  payload: {
    sections: Array<SectionType>;
  };
};

export type SectionActionCreatorType = {
  addSectionDb?: (sectionData: Omit<SectionType, 'id'>) => unknown;
  removeSectionDb?: (sectionId: SectionType['id']) => unknown;
  fetchSectionsByCourseDb?: (courseId: CourseType['id']) => unknown;
  updateSection?: (sectionId: SectionType['id']) => unknown;
};

export type SectionActionType =
  | addSectionAction
  | removeSectionAction
  | FetchSectionsByCourseAction
  | updateSection;

export function addSection(sectionData: SectionType) {
  const sectionId = sectionData.id;
  const section = {
    ...sectionData
  };
  return {
    type: ADD_SECTION,
    payload: {
      sectionId,
      sectionData: section
    }
  };
}

export function removeSection(sectionId: SectionType['id']) {
  return {
    type: REMOVE_SECTION,
    payload: {
      sectionId
    }
  };
}
export function updateSection(
  sectionId: SectionType['id'],
  sectionData: SectionType
) {
  return {
    type: UPDATE_SECTION,
    payload: {
      sectionData
    }
  };
}
export function fetchSectionsByCourse(sectionsData: Array<SectionType>) {
  return {
    type: FETCH_SECTIONS_BY_COURSE,
    payload: {
      sections: sectionsData
    }
  };
}

export function addSectionDb(sectionData: Omit<SectionType, 'id'>) {
  return (dispatch: Dispatch) => {
    SectionRepository.createEntity(sectionData)
      .then(updatedData =>
        dispatch(addSection(Object.assign(sectionData, updatedData)))
      )
      .catch(err => {
        console.log(err);
      });
  };
}

export function removeSectionDb(sectionId: SectionType['id']) {
  return (dispatch: Dispatch) => {
    SectionRepository.deleteEntity(sectionId)
      .then(() => dispatch(removeSection(sectionId)))
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchSectionsByCourseDb(courseId: CourseType['id']) {
  return (dispatch: Dispatch) => {
    if (courseId) {
      SectionRepository.getSectionsByCourseId(courseId)
        .then((sections: Array<SectionType>) => {
          return dispatch(fetchSectionsByCourse(sections));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}
export function updatedDataDb(sectionData: NonNullable<SectionType>) {
  console.log('updating note', sectionData);
  return (dispatch: Dispatch) => {
    SectionRepository.updateEntity(sectionData)
      .then(updatedData => dispatch(updateSection(sectionData.id, sectionData)))
      .catch((err: any) => {
        console.log(err);
      });
  };
}
