import React from 'react';
import { VideoType, NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType, updateNoteDb } from '../../actions/notes';
import NoteCard from '../NoteCard/NoteCard';
import { UIActionCreatorType } from '../../actions/ui';
// import { updateCourse } from '../../actions/courses';
// import notes from '../../reducers/entities/notes';

type Props = NoteActionCreatorType &
  UIActionCreatorType & {
    videoId: VideoType['id'];
    notes: Array<NoteType>;
  };
// const [ timeStamp, setTimeStamp] = useState()
const TimeStampSort = (noteArr: Array<NoteType>) => {
  const timestampsort = noteArr.sort((a, b) => {
    if (parseFloat(a.timestamp) < parseFloat(b.timestamp)) return -1;
    if (parseFloat(a.timestamp) > parseFloat(b.timestamp)) return 1;
    return 0;
  });
  return timestampsort;
};
export default function NoteList(props: Props) {
  const { setTargetTimestamp, videoId, removeNoteDb, notes } = props;
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
            description={note.description}
            timestamp={note.timestamp}
            timestampVisible
            onTimestampClick={() => {
              if (setTargetTimestamp) setTargetTimestamp(note.timestamp);
              // TimeStampSort(notes);
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
