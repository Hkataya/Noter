import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

type Props = {
  cname: string;
  chapters?: Array<Record<string, unknown>>;
  id: string;
  videos?: Array<Record<string, unknown>>;
  thumbnail?: string;
  key?: string;
};

type BgProps = {
  thumbnail: string;
};
const Background = styled.div.attrs({
  className: 'flex overflow-hidden bg-cover bg-center'
})<BgProps>`
  background-image: url(${p => p.thumbnail});
`;

const LeftItem = styled.div.attrs({
  className: 'w-1/3'
})``;

const RightItem = styled.div.attrs({
  className: 'w-2/3 p-4 bg-white rounded-lg'
})`
  background: rgb(28, 26, 46);
  background: linear-gradient(
    120deg,
    rgba(28, 26, 46, 0.8999230033810399) 0%,
    rgba(28, 26, 46, 0.8999230033810399) 100%
  );
`;

const Title = styled.h1.attrs({
  className: 'text-white font-bold text-lg text-justify mb-4'
})``;

const Description = styled.p.attrs({
  className: 'mt-4 text-gray-600 text-sm text-justify'
})``;

const ListItemWrapper = styled.div.attrs({
  className: 'mt-4 text-gray-600 text-sm mt-4 text-justify'
})``;

const ListItem = styled.li.attrs({
  className: 'mt-1'
})``;

const CourseCard = (props: Props) => {
  const { cname, chapters, videos, thumbnail } = props;
  return (
    <div className="w-108 shadow-lg rounded-lg overflow-hidden m-5">
      <Background thumbnail={thumbnail || ''}>
        <LeftItem />
        <RightItem>
          <Title>{cname}</Title>
          <hr />
          <Description>description</Description>
          <ListItemWrapper>
            <ul>
              <ListItem>
                nb of chapters:
                {chapters ? chapters.length : 0}
              </ListItem>
              <ListItem>
                nb of videos:
                {videos ? videos.length : 0}
              </ListItem>
              <ListItem>duration: </ListItem>
            </ul>
          </ListItemWrapper>
          <Button>Watch</Button>
        </RightItem>
      </Background>
      <div className="shadow w-full  rounded-lg bg-grey-light">
        <div
          className="bg-purple-900 py-1 text-center"
          style={{ width: '45%' }}
        />
      </div>
    </div>
  );
};

export default CourseCard;
