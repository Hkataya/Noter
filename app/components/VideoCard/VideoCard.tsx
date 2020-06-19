import React from 'react';
import styled from 'styled-components';
import { VideoType } from '../../reducers/entities/types';
import MenuButton from '../Button/MenuButton';

const Wrapper = styled.div.attrs({
  className:
    'w-full flex border-r border-b border-l border-gray-400 border-l-0 border-t border-gray-400 bg-white rounded-b rounded-b-none rounded-r mr-5 mb-5'
})``;

const First = styled.div.attrs({
  className: 'w-32 h-auto bg-cover bg-center rounded-t rounded-l'
})``;

const Second = styled.div.attrs({
  className: 'p-3 flex-auto flex flex-col justify-between'
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
      <Second>
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-lg mb-2">
            <button
              onClick={e => {
                e.stopPropagation();
                directToMediaPage();
              }}
              type="button"
            >
              {title}
            </button>
          </div>
        </div>
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
