/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import NoteList from './NoteList';
import { NoteType } from '../../reducers/entities/types';
import { setTargetTimestamp } from '../../actions/ui';
import { removeNoteDb } from '../../actions/notes';

function mapStateToProps(state: any, ownProps: any) {
  const { videoId, type } = ownProps;
  const filteredNotes: Array<NoteType> = [];
  if (videoId !== '' && state.entities.videos[videoId]) {
    Object.keys(state.entities.notes).forEach((noteId: string) => {
      if (
        state.entities.notes[noteId].video === videoId &&
        state.entities.notes[noteId].type === type
      )
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
      // TimeStampSort,
      removeNoteDb
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
