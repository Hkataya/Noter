/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addVideoDb, updateVideoDb } from '../../actions/videos';
import { addSectionDb } from '../../actions/sections';
import { openModal, closeModal } from '../../actions/ui';
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
      addVideoDb,
      updateVideoDb,
      addSectionDb,
      openModal,
      closeModal
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
