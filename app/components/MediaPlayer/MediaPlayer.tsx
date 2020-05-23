import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { UIActionCreatorType } from '../../actions/ui';
import { NoteType } from '../../reducers/entities/types';

type Props = UIActionCreatorType & {
  url: string;
  targetTimestamp: NoteType['timestamp'];
};

const MediaPlayer = ({
  url,
  setTargetTimestamp,
  setCurrentTimestamp,
  targetTimestamp
}: Props) => {
  const player = useRef<ReactPlayer>(null);
  useEffect(() => {
    if (targetTimestamp !== '') {
      if (player && player.current)
        player.current.seekTo(Number(targetTimestamp));
      if (setTargetTimestamp) setTargetTimestamp('');
    }
  });

  const logCurrentTime = () => {
    if (player && player.current) {
      const currentTime = player.current.getCurrentTime();
      if (setCurrentTimestamp) setCurrentTimestamp(currentTime.toString());
    }
  };

  return (
    <div>
      <div>
        <ReactPlayer
          url={url}
          onProgress={logCurrentTime}
          ref={player}
          controls
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
