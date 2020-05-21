import React from 'react';
import { useHistory } from 'react-router-dom';
import { SectionType, VideoType } from '../../reducers/entities/types';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoCard from '../VideoCard/VideoCard';
import routes from '../../constants/routes.json';
import { UIActionCreatorType } from '../../actions/ui';

const placeholderThumbnail =
  'https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2016/09/vuejs.png?resize=2200%2C1125';

type Props = VideoActionCreatorType &
  UIActionCreatorType & {
    sectionId: SectionType['id'];
    videos: Array<VideoType>;
  };

export default function VideoList(props: Props) {
  const { sectionId, videos, removeVideo, openModal } = props;
  const history = useHistory();

  return (
    <div>
      {videos.map(video => (
        <VideoCard
          thumbnail={placeholderThumbnail}
          key={video.id}
          title={video.title}
          directToMediaPage={() => {
            history.push(
              `${history.location.pathname}${routes.MEDIA}/${video.id}`
            );
          }}
          onRemoveClick={() => {
            if (removeVideo) removeVideo(video.id, sectionId);
          }}
        />
      ))}
      <div className="'max-w-sm w-full lg:max-w-full lg:flex border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r mr-5 mb-5">
        <button
          onClick={() => {
            if (openModal) openModal({}, 'VIDEO', sectionId);
          }}
          type="button"
        >
          Add New Video +
        </button>
      </div>
    </div>
  );
}
