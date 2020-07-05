import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Spinner from 'react-spinner-material';
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
  const [loader, setLoader] = useState(true);
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
    <>
      {loader ? (
        <div className="text-white h-screen flex justify-center items-center">
          <Spinner radius={120} color="whitesmoke" stroke={2} visible />
        </div>
      ) : null}

      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        onProgress={logCurrentTime}
        onReady={() => {
          setLoader(false);
        }}
        ref={player}
        controls
      />
    </>
  );
};

export default MediaPlayer;
