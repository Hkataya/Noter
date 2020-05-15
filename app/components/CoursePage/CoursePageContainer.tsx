/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addVideo, removeVideo } from '../../actions/videos';
import CoursePage from './CoursePage';

function mapStateToProps(state: any) {
  return {
    courses: state.entities.courses,
    videos: state.entities.videos
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addVideo,
      removeVideo
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
