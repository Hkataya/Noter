import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import VideoCard from '../../app/components/VideoCard/VideoCard';

test('loads and displays video card', async () => {
  const { asFragment } = render(
    <VideoCard
      id="123"
      title="test"
      section="456"
      url="testurl"
      watched={false}
      onRemoveClick={() => {}}
      onToggleClick={() => {}}
      onVideoCardClick={() => {}}
      directToMediaPage={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test('clicks watched toggle', async () => {
  const mockFn = jest.fn();

  render(
    <VideoCard
      id="123"
      title="test"
      section="456"
      url="testurl"
      watched
      onRemoveClick={() => {}}
      onToggleClick={mockFn}
      directToMediaPage={() => {}}
      onVideoCardClick={() => {}}
    />
  );
  fireEvent.click(screen.getByTestId('watched-toggle'));
  expect(mockFn).toHaveBeenCalled();
});
