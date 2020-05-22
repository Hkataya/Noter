import React from 'react';
import { useHistory } from 'react-router-dom';
import MediaPlayer from '../MediaPlayer/MediaPlayer';
import { VideoType, NoteType } from '../../reducers/entities/types';
import NoteListContainer from '../NoteList/NoteListContainer';
import TitleBar from '../TitleBar/TitleBar';
import CreateNote from '../CreateNote/CreateNote';
import { NoteActionCreatorType } from '../../actions/notes';
import { UIActionCreatorType } from '../../actions/ui';

type Props = NoteActionCreatorType &
  UIActionCreatorType & {
    video: VideoType;
    currentTimestamp: NoteType['timestamp'];
    targetTimestamp: NoteType['timestamp'];
  };

export default function MediaPage(props: Props) {
  const {
    video,
    currentTimestamp,
    targetTimestamp,
    setCurrentTimestamp,
    addNote
  } = props;
  const history = useHistory();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div>
        <button type="button" onClick={() => history.goBack()}>
          <i className="fa fa-arrow-left fa-x mt-3 ml-3" />
        </button>
      </div>
      <TitleBar title={video.title} />
      <div className="w-full bg-gray-100 flex-grow">
        <div className="h-full flex flex-row">
          <div className="w-3/4 h-full p-5">
            <MediaPlayer url={video.url} />
          </div>
          <div className="bg-purple-700 w-1/4 h-full flex flex-col p-1">
            <div className=" flex-auto">
              <NoteListContainer videoId={video.id} />
            </div>
            <div>
              <CreateNote
                timestamp={currentTimestamp}
                addNote={addNote}
                videoId={video.id || ''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
