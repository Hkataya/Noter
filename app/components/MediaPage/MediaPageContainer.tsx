/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MediaPage from './MediaPage';
import { addNote, removeNote } from '../../actions/notes';
import { setCurrentTimestamp } from '../../actions/ui';

function mapStateToProps(state: any, ownProps: any) {
  const video = state.entities.videos[ownProps.match.params.vid];
  return {
    video,
    currentTimestamp: state.ui.currentTimestamp,
    targetTimestamp: state.ui.targetTimestamp
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addNote,
      removeNote,
      setCurrentTimestamp
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPage);
