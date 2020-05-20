/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addVideo, removeVideo } from '../../actions/videos';
import VideoList from './VideoList';
import { VideoType } from '../../reducers/entities/types';

function mapStateToProps(state: any, ownProps: any) {
  const { sectionId } = ownProps;
  const section = state.entities.sections[sectionId];
  const filteredVideos: Array<VideoType> = [];
  section.videos.forEach((videoId: string) =>
    filteredVideos.push(state.entities.videos[videoId])
  );
  return {
    sectionId,
    videos: filteredVideos
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addVideo,
      removeVideo
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
