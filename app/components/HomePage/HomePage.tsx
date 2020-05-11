/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';

const CourseWrapper = styled.div.attrs({
  className: 'm-10 flex flex-wrap'
})``;

const HomeWrapper = styled.div.attrs({
  className: 'mx-auto p-5 bg-gray-100 align-center'
})``;

export default function HomePage() {
  return (
    <HomeWrapper>
      <h2>Home</h2>
      <SearchBar />
      <CourseWrapper />
    </HomeWrapper>
  );
}
