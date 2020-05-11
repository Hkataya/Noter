/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div.attrs({
  className:
    'max-w-sm w-full lg:max-w-full lg:flex border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r mr-5 mb-5'
})``;

const First = styled.div.attrs({
  className:
    'h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
})`
  background-image: url(${(props: any) => props.thumbnail});
`;

const Second = styled.div.attrs({
  className: 'p-4 flex flex-col justify-between leading-normal'
})``;

const Third = styled.div.attrs({
  className: ' p-4 flex leading-normal justify-center'
})``;

const VideoCard = (props: any) => {
  const { thumbnail } = props;
  const bgprop = { thumbnail };
  return (
    <Wrapper>
      <First {...bgprop}> </First>
      <Second>
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2" />
        </div>
      </Second>
      <Third />
    </Wrapper>
  );
};

export default VideoCard;
