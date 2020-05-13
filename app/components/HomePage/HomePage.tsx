/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';
import CourseCard from '../CourseCard/CourseCard';
import { CourseType } from '../../reducers/entities/types';
import { CourseActionCreatorType } from '../../actions/courses';

const CourseWrapper = styled.div.attrs({
  className: 'm-10 flex flex-wrap'
})``;

const HomeWrapper = styled.div.attrs({
  className: 'mx-auto p-5 bg-gray-100 align-center'
})``;

type Props = CourseType & CourseActionCreatorType;

export default function HomePage(props: Props) {
  const { courses, removeCourse, addCourse } = props;

  return (
    <HomeWrapper>
      <h2>Home</h2>
      <SearchBar />
      <CourseWrapper>
        {Object.keys(courses).map(k => (
          <CourseCard
            key={k}
            title={courses[k].title}
            id={k}
            chapters={courses[k].chapters}
            videos={courses[k].videos}
            duration={courses[k].duration}
            thumbnail={courses[k].thumbnail}
            removeCourse={removeCourse}
          />
        ))}
      </CourseWrapper>
    </HomeWrapper>
  );
}
