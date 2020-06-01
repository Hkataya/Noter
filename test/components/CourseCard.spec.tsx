import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CourseCard from '../../app/components/CourseCard/CourseCard';

test('loads and displays course card', async () => {
  const { asFragment } = render(
    <CourseCard
      id="123"
      title="test"
      removeCourse={() => {}}
      directToCoursePage={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test('clicks direct to course page button', async () => {
  const directToCoursePage = jest.fn();

  render(
    <CourseCard
      id="123"
      title="test"
      description="description"
      removeCourse={() => {}}
      directToCoursePage={directToCoursePage}
    />
  );

  fireEvent.click(screen.getByText('Watch'));
  expect(directToCoursePage).toHaveBeenCalled();
});
