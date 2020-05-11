import React from 'react';
import styled from 'styled-components';

const OuterWrapper = styled.div.attrs({
  className: 'bg-white'
})``;

const Navigation = styled.nav.attrs({
  className: 'flex flex-row bg-transparent'
})``;

const Title = styled.h1.attrs({
  className:
    'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-purple-700 border-b-2 font-medium border-purple-700'
})``;

type Props = {
  title: string;
};

const TitleBar = (props: Props) => {
  const { title } = props;

  return (
    <OuterWrapper>
      <Navigation>
        <Title>{title}</Title>
      </Navigation>
    </OuterWrapper>
  );
};

export default TitleBar;
