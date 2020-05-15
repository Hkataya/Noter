import React from 'react';
import { CourseType } from '../../reducers/entities/types';
import { EntityStateType } from '../../reducers/types';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoCard from '../VideoCard/VideoCard';

type Props = VideoActionCreatorType & {
  course: CourseType;
  videos: EntityStateType['videos'];
  openAddVideoModal: () => void;
};

export default function VideoList(props: Props) {
  const { course, videos, removeVideo, openAddVideoModal } = props;

  return (
    <div className="w-3/4 h-full p-5 overflow-y-scroll">
      {course.videos &&
        course.videos.map(id => (
          <VideoCard
            thumbnail="https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2016/09/vuejs.png?resize=2200%2C1125"
            key={id}
            title={videos[id].title}
            onRemoveClick={() => {
              if (removeVideo) removeVideo(id, course.id);
            }}
          />
        ))}
      <div className="'max-w-sm w-full lg:max-w-full lg:flex border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r mr-5 mb-5">
        <button type="button" onClick={openAddVideoModal}>
          Add New Video +
        </button>
      </div>
    </div>
  );
}
