import React from 'react';
import { VideoType, NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType } from '../../actions/notes';
import NoteCard from '../NoteCard/NoteCard';
import { UIActionCreatorType } from '../../actions/ui';

type Props = NoteActionCreatorType &
  UIActionCreatorType & {
    videoId: VideoType['id'];
    notes: Array<NoteType>;
  };

export default function NoteList(props: Props) {
  const { notes, setTargetTimestamp } = props;
  return (
    <div>
      {notes.length ? (
        notes.map(note => (
          <NoteCard
            key={note.id}
            title={note.title}
            description={note.description}
            timestamp={note.timestamp}
            timestampVisible
            onTimestampClick={() => {
              if (setTargetTimestamp) setTargetTimestamp(note.timestamp);
            }}
          />
        ))
      ) : (
        <span> please select a video | selected video has no notes </span>
      )}
    </div>
  );
}
