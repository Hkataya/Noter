/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import {
  addCourseDb,
  removeCourseDb,
  fetchAllCoursesDb,
  updateCourseDb
} from '../../actions/courses';

import { openModal, closeModal } from '../../actions/ui';

function mapStateToProps(state: any) {
  return {
    courses: state.entities.courses,
    modal: state.ui.modal
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addCourseDb,
      removeCourseDb,
      updateCourseDb,
      fetchAllCoursesDb,
      openModal,
      closeModal
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
