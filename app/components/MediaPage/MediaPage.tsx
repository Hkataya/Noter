import React from 'react';
import { useHistory } from 'react-router-dom';
import { Resizable } from 're-resizable';
import MediaPlayer from '../MediaPlayer/MediaPlayer';
import {
  VideoType,
  NoteType,
  NoteShapeType
} from '../../reducers/entities/types';
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
    setTargetTimestamp,
    addNoteDb
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
      <div className="h-full flex overflow-visible">
        <Resizable minWidth="70%" maxWidth="80%">
          <div className="h-full p-2 bg-gray-800">
            <MediaPlayer
              targetTimestamp={targetTimestamp}
              setCurrentTimestamp={setCurrentTimestamp}
              setTargetTimestamp={setTargetTimestamp}
              url={video.url}
            />
          </div>
        </Resizable>

        <div className="bg-gray-800 h-full flex flex-col flex-auto ">
          <div className="flex-auto p-3 overflow-y-scroll">
            <NoteListContainer videoId={video.id} type={NoteShapeType.note} />
          </div>
          <div className="pt-2 pl-2 pr-2 pb-0">
            <CreateNote
              timestamp={currentTimestamp}
              addNoteDb={addNoteDb}
              videoId={video.id || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
