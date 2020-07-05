import React from 'react';
import { VideoType, NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType } from '../../actions/notes';
import NoteCard from '../NoteCard/NoteCard';
import { UIActionCreatorType } from '../../actions/ui';

// **** Prop Types Section **** //

type Props = NoteActionCreatorType &
  UIActionCreatorType & {
    videoId: VideoType['id'];
    notes: Array<NoteType>;
    timestampVisible: boolean;
  };

// **** Component Utilities Section **** //

const TimeStampSort = (noteArr: Array<NoteType>) => {
  const timestampsort = noteArr.sort((a, b) => {
    if (parseFloat(a.timestamp) < parseFloat(b.timestamp)) return -1;
    if (parseFloat(a.timestamp) > parseFloat(b.timestamp)) return 1;
    return 0;
  });
  return timestampsort;
};

// **** Component Section **** //

export default function NoteList(props: Props) {
  const {
    setTargetTimestamp,
    videoId,
    removeNoteDb,
    updateNoteDb,
    notes,
    timestampVisible
  } = props;

  const sortedNotes = TimeStampSort(notes);

  return (
    <div>
      {sortedNotes.length ? (
        sortedNotes.map(note => (
          <NoteCard
            id={note.id}
            key={note.id}
            title={note.title}
            video={videoId}
            type={note.type}
            timestampVisible={timestampVisible}
            description={note.description}
            setDescription={(description: string) => {
              // eslint-disable-next-line no-param-reassign
              note.description = description;
            }}
            setTitle={title => {
              // eslint-disable-next-line no-param-reassign
              note.title = title;
            }}
            timestamp={note.timestamp}
            onTimestampClick={() => {
              if (setTargetTimestamp) setTargetTimestamp(note.timestamp);
            }}
            onRemoveClick={() => {
              if (removeNoteDb) removeNoteDb(note.id);
            }}
            onUpdateClick={() => {
              if (updateNoteDb) updateNoteDb(note);
            }}
          />
        ))
      ) : (
        <div className="bg-yellow-600 rounded p-3 text-white">
          <i className="fa fa-exclamation-circle mr-3" aria-hidden="true" />
          Selected Video Has No Notes!
        </div>
      )}
    </div>
  );
}
