/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addVideo } from '../../actions/videos';
import { addSection } from '../../actions/sections';
import CoursePage from './CoursePage';

function mapStateToProps(state: any, ownProps: any) {
  const course = state.entities.courses[ownProps.match.params.id];
  return {
    course
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addVideo,
      addSection
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
