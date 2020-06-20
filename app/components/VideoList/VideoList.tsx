/* eslint-disable no-shadow */
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
    toggleWatchedDb,
    openModal,
    closeModal,
    setCurrentlySelected,
    addVideoDb,
    updateVideoDb
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
            updateVideoDb={updateVideoDb}
            data={modal.data}
          />
        </Modal>
      )}

      {videos.map(video => (
        <VideoCard
          onToggleClick={() => {
            if (toggleWatchedDb) toggleWatchedDb(video);
          }}
          createdAt={video.createdAt}
          online={video.online}
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
          onUpdateVideoClick={() => {
            if (openModal) openModal(video, '', 'VIDEO');
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
