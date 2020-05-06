import React from 'react';
import styled from 'styled-components';

const Background = styled.div.attrs({
  className: 'flex overflow-hidden bg-cover'
})`
  background-image: url('https://miro.medium.com/max/2000/1*oZqGznbYXJfBlvGp5gQlYQ.jpeg');
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
    rgba(28, 26, 46, 0.9699230033810399) 0%,
    rgba(28, 26, 46, 0.9699230033810399) 100%
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

const CourseCard = () => {
  return (
    <div className="h-90 max-w-md shadow-lg rounded-lg overflow-hidden">
      <Background>
        <LeftItem />
        <RightItem>
          <Title>props.title</Title>
          <hr />
          <Description>props.description</Description>
          <ListItemWrapper>
            <ul>
              <ListItem>nb of courses: props.chapters.length </ListItem>
              <ListItem>nb of videos: props.videos.length </ListItem>
              <ListItem>duration: props.duration </ListItem>
            </ul>
          </ListItemWrapper>
          <button type="button"> Watch </button>
        </RightItem>
      </Background>
      <div className="shadow w-full bg-grey-light">
        <div
          className="bg-blue-300 py-1 text-center"
          style={{ width: '45%' }}
        />
      </div>
    </div>
  );
};

export default CourseCard;
