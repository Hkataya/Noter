/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import NoteList from './NoteList';
import { NoteType } from '../../reducers/entities/types';
import { setTargetTimestamp } from '../../actions/ui';
import { removeNoteDb } from '../../actions/notes';
<<<<<<< HEAD
import TimeStampSort from './NoteList';
=======
>>>>>>> 8b967dc9ea56469c66dcef4cd12d358abd3f75c2

function mapStateToProps(state: any, ownProps: any) {
  const { videoId } = ownProps;
  const filteredNotes: Array<NoteType> = [];
  if (videoId !== '' && state.entities.videos[videoId]) {
    Object.keys(state.entities.notes).forEach((noteId: string) => {
      if (state.entities.notes[noteId].video === videoId)
        filteredNotes.push(state.entities.notes[noteId]);
    });
  }

  return {
    videoId,
    notes: filteredNotes
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setTargetTimestamp,
      TimeStampSort,
      removeNoteDb
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
