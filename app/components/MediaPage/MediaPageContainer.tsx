/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MediaPage from './MediaPage';
import { addNoteDb, removeNoteDb } from '../../actions/notes';
import { setCurrentTimestamp, setTargetTimestamp } from '../../actions/ui';

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
      addNoteDb,
      removeNoteDb,
      setCurrentTimestamp,
      setTargetTimestamp
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPage);
