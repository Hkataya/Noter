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
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      onProgress={logCurrentTime}
      ref={player}
      controls
    />
  );
};

export default MediaPlayer;
