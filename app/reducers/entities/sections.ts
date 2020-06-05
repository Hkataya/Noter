/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ADD_SECTION,
  REMOVE_SECTION,
  FETCH_SECTIONS_BY_COURSE,
  SectionActionType,
  UPDATE_SECTION
} from '../../actions/sections';

export default function sections(state = {}, action: SectionActionType) {
  const newState: any = { ...state };
  switch (action.type) {
    case ADD_SECTION:
      if (action.payload && action.payload.sectionId)
        newState[action.payload.sectionId] = action.payload.sectionData;
      return newState;

    case REMOVE_SECTION:
      if (action.payload && action.payload.sectionId)
        delete newState[action.payload.sectionId];
      return newState;

    case FETCH_SECTIONS_BY_COURSE:
      if (action.payload && action.payload.sections) {
        action.payload.sections.forEach(section => {
          newState[section.id] = section;
        });
      }

      return newState;

    case UPDATE_SECTION:
      if (action.payload && action.payload.sectionData)
        newState[action.payload.sectionData.id] = action.payload.sectionData;
      return newState;

    default:
      return state;
  }
}
