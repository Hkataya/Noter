import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  url: string;
  getProgress?: () => void;
};

const MediaPlayer = ({ url, getProgress }: Props) => {
  return (
    <div>
      <div>
        <ReactPlayer url={url} onProgress={getProgress} controls />
      </div>
    </div>
  );
};

export default MediaPlayer;
