/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MediaPage from './MediaPage';
import { addNote, removeNote } from '../../actions/notes';

function mapStateToProps(state: any) {
  return {
    videos: state.entities.videos,
    notes: state.entities.notes
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addNote,
      removeNote
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPage);
