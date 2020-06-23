import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  url: string;
};

const LightMediaPlayer = (props: Props) => {
  const { url } = props;
  return <ReactPlayer url={url} light width="100%" height="100%" />;
};

export default LightMediaPlayer;
