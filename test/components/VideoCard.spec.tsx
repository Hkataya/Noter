import React from 'react';
import { render } from '@testing-library/react';
import VideoCard from '../../app/components/VideoCard/VideoCard';

test('loads and displays video card', async () => {
  const { asFragment } = render(
    <VideoCard
      id="123"
      title="test"
      section="456"
      url="testurl"
      online
      createdAt={new Date()}
      watched={false}
      onRemoveClick={() => {}}
      onToggleClick={() => {}}
      onVideoCardClick={() => {}}
      directToMediaPage={() => {}}
      onUpdateVideoClick={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
