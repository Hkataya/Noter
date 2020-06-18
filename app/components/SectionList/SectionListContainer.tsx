/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  removeSectionDb,
  fetchSectionsByCourseDb
} from '../../actions/sections';
import SectionList from './SectionList';
import { SectionType } from '../../reducers/entities/types';
import { openModal } from '../../actions/ui';

function mapStateToProps(state: any, ownProps: any) {
  const { courseId } = ownProps;
  const filteredSections: Array<SectionType> = [];
  if (state.entities.sections) {
    Object.keys(state.entities.sections).forEach((sectionId: string) => {
      if (state.entities.sections[sectionId].course === courseId)
        filteredSections.push(state.entities.sections[sectionId]);
    });
  }
  return {
    courseId,
    sections: filteredSections
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      removeSectionDb,
      fetchSectionsByCourseDb,
      openModal
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionList);
