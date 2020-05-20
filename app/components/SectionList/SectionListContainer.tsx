/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { removeSection } from '../../actions/sections';
import SectionList from './SectionList';
import { SectionType } from '../../reducers/entities/types';

function mapStateToProps(state: any, ownProps: any) {
  const { courseId } = ownProps;
  const course = state.entities.courses[courseId];
  const filteredSections: Array<SectionType> = [];
  course.sections.forEach((sectionId: string) =>
    filteredSections.push(state.entities.sections[sectionId])
  );
  return {
    courseId,
    sections: filteredSections
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      removeSection
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionList);
