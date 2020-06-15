/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  addVideoDb,
  removeVideoDb,
  toggleWatched,
  fetchVideosBySectionDb,
  updateVideoDb
} from '../../actions/videos';
import { openModal, closeModal, setCurrentlySelected } from '../../actions/ui';
import VideoList from './VideoList';
import { VideoType } from '../../reducers/entities/types';

function mapStateToProps(state: any, ownProps: any) {
  const { sectionId } = ownProps;
  const filteredVideos: Array<VideoType> = [];
  Object.keys(state.entities.videos).forEach((videoId: string) => {
    if (state.entities.videos[videoId].section === sectionId)
      filteredVideos.push(state.entities.videos[videoId]);
  });
  return {
    sectionId,
    videos: filteredVideos,
    modal: state.ui.modal
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addVideoDb,
      removeVideoDb,
      updateVideoDb,
      fetchVideosBySectionDb,
      openModal,
      closeModal,
      toggleWatched,
      setCurrentlySelected
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
