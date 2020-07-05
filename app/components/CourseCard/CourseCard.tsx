import React from 'react';
import styled from 'styled-components';
import { CourseType } from '../../reducers/entities/types';
import MenuButton from '../Button/MenuButton';
import Button from '../Button/Button';

// **** Style Section **** //

const Wrapper = styled.div.attrs({
  className: 'w-96 shadow-lg rounded-t-lg m-5'
})``;

type BgProps = {
  thumbnail: string;
};
const Background = styled.div.attrs({
  className: 'flex bg-cover bg-center rounded-lg '
})<BgProps>`
  background-image: url(${p => p.thumbnail});
`;

const LeftItem = styled.div.attrs({
  className: 'w-1/3 rounded-lg'
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
  className: 'text-white font-bold text-lg text-justify truncate'
})``;

const Description = styled.p.attrs({
  className: 'mt-4 text-gray-600 text-sm break-all whitespace-pre-wrap'
})``;

const ListItemWrapper = styled.div.attrs({
  className: 'mt-5 text-gray-600 text-sm mt-4 text-justify'
})``;

const ListItem = styled.li.attrs({
  className: 'mt-1'
})``;

const ButtonWrapper = styled.div.attrs({
  className: 'flex justify-end mt-6'
})``;

// **** Component Specific Utilities **** //

const maximumCharactersAllowed = (text: string) => {
  if (!text.length) return 'no description\n';
  if (text.length < 34) return `${text}\n `;
  if (text.length < 60) return `${text} `;
  return `${text.substring(0, Math.min(text.length, 60))}...`;
};

const getFormattedDate = (dt: Date) => {
  return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
};

// **** Prop Types **** //

type Props = CourseType & {
  removeCourse: () => void;
  directToCoursePage: () => void;
  updateCourse: () => void;
};

// **** Component Function **** //

const CourseCard = (props: Props) => {
  const {
    title,
    thumbnail,
    videoCount,
    createdAt,
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
    <Wrapper>
      <Background thumbnail={thumbnail || ''}>
        <LeftItem />
        <RightItem>
          <div className="flex justify-end -mt-4">
            <MenuButton items={items} />
          </div>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <hr className="border-gray-700" />
          <Description>
            {maximumCharactersAllowed(description || '')}
          </Description>
          <ListItemWrapper>
            <ul>
              <ListItem>
                <i className="fas fa-video  mr-3" />
                videos: &nbsp;
                {videoCount}
              </ListItem>
            </ul>
            <ul>
              <ListItem>
                <i className="fas fa-clock mr-3" />
                created on: &nbsp;
                {getFormattedDate(new Date(createdAt))}
              </ListItem>
            </ul>
          </ListItemWrapper>
          <ButtonWrapper>
            <Button type="button" onClick={directToCoursePage}>
              Watch
            </Button>
          </ButtonWrapper>
        </RightItem>
      </Background>
    </Wrapper>
  );
};

export default CourseCard;
