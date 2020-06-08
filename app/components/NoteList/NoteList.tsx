import React from 'react';
import { VideoType, NoteType } from '../../reducers/entities/types';
import NoteCard from '../NoteCard/NoteCard';
import { UIActionCreatorType } from '../../actions/ui';
import { updateCourse } from '../../actions/courses';

type Props = NoteActionCreatorType &
  UIActionCreatorType & {
    videoId: VideoType['id'];
    notes: Array<NoteType>;
  };
// const [ timeStamp, setTimeStamp] = useState()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TimeStampSort = (notes: Array<NoteType>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const timestampsort = notes.sort(function(a, b) {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0;
  });
  return timestampsort;
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
              TimeStampSort(notes);
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
        <span> please select a video | selected video has no notes </span>
      )}
    </div>
  );
}
