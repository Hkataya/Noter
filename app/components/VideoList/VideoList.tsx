import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SectionType, VideoType } from '../../reducers/entities/types';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoCard from '../VideoCard/VideoCard';
import routes from '../../constants/routes.json';
import { UIActionCreatorType } from '../../actions/ui';
import Modal from '../Modal/Modal';
import { UIStateType } from '../../reducers/types';
import VideoForm from '../Form/VideoForm';

const placeholderThumbnail =
  'https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2016/09/vuejs.png?resize=2200%2C1125';

type Props = VideoActionCreatorType &
  UIActionCreatorType &
  UIStateType & {
    sectionId: SectionType['id'];
    videos: Array<VideoType>;
  };

export default function VideoList(props: Props) {
  const {
    sectionId,
    videos,
    modal,
    removeVideoDb,
    fetchVideosBySectionDb,
    toggleWatched,
    openModal,
    closeModal,
    setCurrentlySelected,
    addVideoDb
  } = props;
  const history = useHistory();
  useEffect(() => {
    if (fetchVideosBySectionDb) {
      console.log('Fetching Data');
      fetchVideosBySectionDb(sectionId);
    }
  }, []);
  return (
    <div>
      {modal.visible && modal.type === 'VIDEO' && (
        <Modal
          title="Add Video"
          handleClose={() => {
            if (closeModal) closeModal();
          }}
        >
          <VideoForm
            closeModal={() => {
              if (closeModal) closeModal();
            }}
            sectionId={modal.parentId || ''}
            addVideoDb={addVideoDb}
          />
        </Modal>
      )}

      {videos.map(video => (
        <VideoCard
          onToggleClick={() => {
            if (toggleWatched) toggleWatched(video.id);
          }}
          thumbnail={placeholderThumbnail}
          key={video.id}
          id={video.id}
          watched={video.watched}
          url={video.url}
          section={sectionId}
          title={video.title}
          directToMediaPage={() => {
            history.push(
              `${history.location.pathname}${routes.MEDIA}/${video.id}`
            );
          }}
          onRemoveClick={() => {
            if (removeVideoDb) removeVideoDb(video.id);
          }}
          onVideoCardClick={() => {
            if (setCurrentlySelected) setCurrentlySelected(video.id || '');
          }}
        />
      ))}
      <div className="'max-w-sm w-full lg:max-w-full lg:flex border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r mr-5 mb-5">
        <button
          onClick={() => {
            if (openModal) openModal({}, sectionId, 'VIDEO');
          }}
          type="button"
        >
          Add New Video +
        </button>
      </div>
    </div>
  );
}
