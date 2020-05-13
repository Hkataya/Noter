/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import { addCourse, removeCourse } from '../../actions/courses';

function mapStateToProps(state: any) {
  return {
    courses: state.entities.courses
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addCourse,
      removeCourse
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);