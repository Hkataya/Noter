/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { SectionType, VideoType } from '../../reducers/entities/types';
import { VideoActionCreatorType } from '../../actions/videos';
import VideoCard from '../VideoCard/VideoCard';
import routes from '../../constants/routes.json';
import { UIActionCreatorType } from '../../actions/ui';
import Modal from '../Modal/Modal';
import { UIStateType } from '../../reducers/types';
import VideoForm from '../Form/VideoForm';
import formType from '../../constants/form-types.json';

const AddVideoButtonWrapper = styled.div.attrs({
  className:
    'max-w-sm w-full lg:max-w-full lg:flex rounded border border-gray-400 bg-white p-2 mr-5 mb-5'
})``;

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
    toggleWatchedDb,
    openModal,
    closeModal,
    setCurrentlySelected,
    addVideoDb,
    updateVideoDb
  } = props;
  const history = useHistory();

  return (
    <div>
      {modal.visible && modal.type === formType.VIDEO && (
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
            if (openModal) openModal(video, '', formType.VIDEO);
          }}
        />
      ))}
      <AddVideoButtonWrapper>
        <button
          className=" w-full text-center focus:outline-none"
          onClick={() => {
            if (openModal) openModal({}, sectionId, formType.VIDEO);
          }}
          type="button"
        >
          Add new video +
        </button>
      </AddVideoButtonWrapper>
    </div>
  );
}
