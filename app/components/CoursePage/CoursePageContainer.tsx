/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addSectionDb, updateSectionDb } from '../../actions/sections';
import { fetchCourseContentDb } from '../../actions/courses';
import { openModal, closeModal, setCurrentlySelected } from '../../actions/ui';
import CoursePage from './CoursePage';

function mapStateToProps(state: any, ownProps: any) {
  const course = state.entities.courses[ownProps.match.params.id];
  return {
    course,
    modal: state.ui.modal,
    currentlySelected: state.ui.currentlySelected
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addSectionDb,
      updateSectionDb,
      openModal,
      closeModal,
      fetchCourseContentDb,
      setCurrentlySelected
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
