/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import NoteList from './NoteList';
import { NoteType } from '../../reducers/entities/types';

function mapStateToProps(state: any, ownProps: any) {
  const { videoId } = ownProps;
  const filteredNotes: Array<NoteType> = [];
  if (videoId !== '' && state.entities.videos[videoId]) {
    const video = state.entities.videos[videoId];
    video.notes.forEach((noteId: string) =>
      filteredNotes.push(state.entities.notes[noteId])
    );
  }

  return {
    videoId,
    notes: filteredNotes
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
