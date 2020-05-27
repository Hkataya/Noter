/* eslint-disable @typescript-eslint/no-explicit-any */
import { allsections } from '../../normalized-state';

import {
  ADD_SECTION,
  REMOVE_SECTION,
  FETCH_SECTIONS_BY_COURSE,
  SectionActionType
} from '../../actions/sections';

export default function sections(
  state = allsections,
  action: SectionActionType
) {
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
          if (section.id) newState[section.id] = section;
        });
      }

      return newState;

    default:
      return state;
  }
}
