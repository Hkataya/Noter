/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { VideoType, NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType, removeNoteDb } from '../../actions/notes';
import NoteCard from '../NoteCard/NoteCard';
import { UIActionCreatorType } from '../../actions/ui';

type Props = NoteActionCreatorType &
  UIActionCreatorType & {
    videoId: VideoType['id'];
    notes: Array<NoteType>;
  };
export default function NoteList(props: Props) {
  const { notes, setTargetTimestamp, videoId, removeNoteDb } = props;
  return (
    <div>
      {notes.length ? (
        notes.map(note => (
          <NoteCard
            id={note.id}
            key={note.id}
            title={note.title}
            video={videoId}
            description={note.description}
            timestamp={note.timestamp}
            timestampVisible
            onTimestampClick={() => {
              if (setTargetTimestamp) setTargetTimestamp(note.timestamp);
            }}
            onRemoveClick={() => {
              if (removeNoteDb) removeNoteDb(note.id);
            }}
          />
        ))
      ) : (
        <span> please select a video | selected video has no notes </span>
      )}
    </div>
  );
}
