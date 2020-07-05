import React from 'react';
import styled from 'styled-components';
import LightMediaPlayer from '../MediaPlayer/LightMediaPlayer';
import { VideoType } from '../../reducers/entities/types';
import MenuButton from '../Button/MenuButton';

const Wrapper = styled.div.attrs({
  className:
    'w-full h-24 flex flex-wrap border-r border-b border-l border-gray-400 border-l-0 border-t border-gray-400 bg-white rounded-b rounded-b-none rounded-r mr-5 mb-5'
})``;

const First = styled.div.attrs({
  className: 'border w-40 h-24 border-gray-200'
})``;

const Second = styled.div.attrs({
  className: 'p-3 flex-1 h-24 overflow-hidden'
})``;

const Third = styled.div.attrs({
  className: ' p-3 flex justify-center'
})``;

const Fourth = styled.div.attrs({
  className: ' pr-2 pl-3'
})``;

type Props = VideoType & {
  onRemoveClick: () => void;
  directToMediaPage: () => void;
  onToggleClick: () => void;
  onVideoCardClick: () => void;
  onUpdateVideoClick: () => void;
};

const VideoCard = (props: Props) => {
  const {
    title,
    onRemoveClick,
    directToMediaPage,
    onToggleClick,
    onVideoCardClick,
    watched,
    url,
    onUpdateVideoClick
  } = props;

  const checkColor: string = watched ? 'text-green-500' : 'text-gray-500';
  const items = [
    {
      label: 'remove',
      action: onRemoveClick
    },
    {
      label: 'update',
      action: onUpdateVideoClick
    }
  ];
  return (
    <Wrapper onClick={onVideoCardClick}>
      <First
        onClick={e => {
          e.stopPropagation();
          directToMediaPage();
        }}
      >
        <span className="pointer-events-none">
          <LightMediaPlayer url={url} />
        </span>
      </First>
      <Second>
        <button
          className="-mt-6 text-left break-all"
          onClick={e => {
            e.stopPropagation();
            directToMediaPage();
          }}
          type="button"
        >
          {title}
        </button>
      </Second>
      <Third>
        <button
          data-testid="watched-toggle"
          className="focus:outline-none"
          type="button"
          onClick={e => {
            e.stopPropagation();
            onToggleClick();
          }}
        >
          <i className={`fas fa-check fa-2x ${checkColor} `} />
        </button>
      </Third>
      <Fourth>
        <MenuButton items={items} />
      </Fourth>
    </Wrapper>
  );
};

export default VideoCard;
