import React from 'react';
import { VideoType, NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType } from '../../actions/notes';
import NoteCard from '../NoteCard/NoteCard';

type Props = NoteActionCreatorType & {
  videoId: VideoType['id'];
  notes: Array<NoteType>;
};

export default function NoteList(props: Props) {
  const { notes } = props;
  return (
    <div>
      {notes.length ? (
        notes.map(note => (
          <NoteCard
            key={note.id}
            title={note.title}
            description={note.description}
          />
        ))
      ) : (
        <span> please select a video | selected video has no notes </span>
      )}
    </div>
  );
}
