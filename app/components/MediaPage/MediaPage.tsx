import React from 'react';
import { useParams, Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import MediaPlayer from '../MediaPlayer/MediaPlayer';
import { EntityStateType } from '../../reducers/types';
import NoteList from '../NoteList/NoteList';
import { NoteActionCreatorType } from '../../actions/notes';

type Props = EntityStateType & NoteActionCreatorType;
type RouteParams = {
  id: string;
  vid: string;
};

export default function MediaPage(props: Props) {
  const { videos, notes, addNote, removeNote } = props;
  const params = useParams<RouteParams>();
  const courseId = params.id;
  const videoId = params.vid;
  const currentVideo = videos[videoId];
  const getProgress = () => {};

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Link to={`${routes.COURSE}/${courseId}`}>
        <i className="fa fa-arrow-left fa-2x mt-3 ml-3" />
      </Link>
      <h1>{currentVideo.title}</h1>
      <div className="w-full bg-gray-100 flex-grow">
        <div className="h-full flex flex-row">
          <div className="w-3/4 h-full p-5">
            <MediaPlayer getProgress={getProgress} url={currentVideo.url} />
          </div>
          <div className="bg-purple-900 w-1/4 h-full p-5 overflow-y-scroll">
            <NoteList
              video={currentVideo}
              notes={notes}
              addNote={addNote}
              removeNote={removeNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
