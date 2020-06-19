import React from 'react';
import styled from 'styled-components';
import { CourseType } from '../../reducers/entities/types';
import MenuButton from '../Button/MenuButton';
import Button from '../Button/Button';

type BgProps = {
  thumbnail: string;
};
const Background = styled.div.attrs({
  className: 'flex  bg-cover bg-center rounded-t-lg'
})<BgProps>`
  background-image: url(${p => p.thumbnail});
`;

const LeftItem = styled.div.attrs({
  className: 'w-1/3'
})``;

const RightItem = styled.div.attrs({
  className: 'w-2/3 p-5 bg-white rounded-lg'
})`
  background: rgb(28, 26, 46);
  background: linear-gradient(
    120deg,
    rgba(28, 26, 46, 0.8999230033810399) 0%,
    rgba(28, 26, 46, 0.8999230033810399) 100%
  );
`;

const TitleWrapper = styled.div.attrs({
  className: 'flex text-white mb-4'
})``;
const Title = styled.h1.attrs({
  className: 'text-white font-bold text-lg text-justify break-all'
})``;

const Description = styled.p.attrs({
  className: 'mt-4 text-gray-600 text-sm text-justify break-all'
})``;

const ListItemWrapper = styled.div.attrs({
  className: 'mt-4 text-gray-600 text-sm mt-4 text-justify'
})``;

const ListItem = styled.li.attrs({
  className: 'mt-1'
})``;

type Props = CourseType & {
  removeCourse: () => void;
  directToCoursePage: () => void;
  updateCourse: () => void;
};

const CourseCard = (props: Props) => {
  const {
    title,
    thumbnail,
    description,
    removeCourse,
    directToCoursePage,
    updateCourse
  } = props;

  const items = [
    {
      label: 'Remove',
      action: removeCourse
    },
    {
      label: 'update',
      action: updateCourse
    }
  ];

  return (
    <div className="w-96 shadow-lg rounded-t-lg m-5">
      <Background thumbnail={thumbnail || ''}>
        <LeftItem />
        <RightItem>
          <div className="flex justify-end -mt-4">
            <MenuButton items={items} />
          </div>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <hr />
          <Description>{description}</Description>
          <ListItemWrapper>
            <ul>
              <ListItem>
                <i className="fas fa-clock mr-3" />
                videos: &nbsp;
              </ListItem>
            </ul>
          </ListItemWrapper>
          <div className="flex justify-end mt-3">
            <Button type="button" onClick={directToCoursePage}>
              Watch
            </Button>
          </div>
        </RightItem>
      </Background>
    </div>
  );
};

export default CourseCard;
