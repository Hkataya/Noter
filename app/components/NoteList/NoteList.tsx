import React from 'react';
import { VideoType } from '../../reducers/entities/types';
import { EntityStateType } from '../../reducers/types';
import { NoteActionCreatorType } from '../../actions/notes';
import CreateNote from '../CreateNote/CreateNote';

type Props = NoteActionCreatorType & {
  video: VideoType;
  notes: EntityStateType['notes'];
};

export default function NoteList(props: Props) {
  const { video, notes, addNote } = props;
  return (
    <div>
      {video.notes &&
        video.notes.map(id => <div key={id}>{notes[id].title}</div>)}
      {video.id && <CreateNote videoId={video.id} addNote={addNote} />}
    </div>
  );
}
