import { VideoType, SectionType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import { videoRepository as VideoRepository } from '../db/RepositoryInitializer';

export const ADD_VIDEO = 'ADD_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const TOGGLE_WATCHED = 'TOGGLE_WATCHED';
export const FETCH_VIDEOS_BY_SECTION = 'FETCH_VIDEOS_BY_SECTION';
export const UPDATE_VIDEO = 'UPDATE_VIDEO';
type UpdateVideoAction = {
  type: typeof UPDATE_VIDEO;
  payload: {
    videoData: VideoType;
  };
};
type AddVideoAction = {
  type: typeof ADD_VIDEO;
  payload: {
    videoId: VideoType['id'];
    videoData: VideoType;
  };
};

type RemoveVideoAction = {
  type: typeof REMOVE_VIDEO;
  payload: {
    videoId: VideoType['id'];
  };
};

type ToggleWatchedAction = {
  type: typeof TOGGLE_WATCHED;
  payload: {
    videoId: VideoType['id'];
  };
};

type FetchVideosBySectionAction = {
  type: typeof FETCH_VIDEOS_BY_SECTION;
  payload: {
    videos: Array<VideoType>;
  };
};

export type VideoActionCreatorType = {
  addVideoDb?: (videoData: Omit<VideoType, 'id'>) => unknown;
  removeVideoDb?: (videoId: VideoType['id']) => unknown;
  toggleWatched?: (videoId: VideoType['id']) => void;
  fetchVideosBySectionDb?: (sectionId: SectionType['id']) => unknown;
  updateVideoDb?: (videoData: VideoType) => unknown;
};

export type VideoActionType =
  | AddVideoAction
  | RemoveVideoAction
  | ToggleWatchedAction
  | FetchVideosBySectionAction
  | UpdateVideoAction;

export function addVideo(videoData: VideoType) {
  const videoId = videoData.id;
  return {
    type: ADD_VIDEO,
    payload: {
      videoId,
      videoData
    }
  };
}

export function removeVideo(videoId: VideoType['id']) {
  return {
    type: REMOVE_VIDEO,
    payload: {
      videoId
    }
  };
}
export function updateVideo(videoData: VideoType) {
  return {
    type: UPDATE_VIDEO,
    payload: {
      videoData
    }
  };
}
export function toggleWatched(videoId: VideoType['id']) {
  return {
    type: TOGGLE_WATCHED,
    payload: {
      videoId
    }
  };
}

export function fetchVideosBySection(videosData: Array<VideoType>) {
  return {
    type: FETCH_VIDEOS_BY_SECTION,
    payload: {
      videos: videosData
    }
  };
}

export function addVideoDb(videoData: Omit<VideoType, 'id'>) {
  return (dispatch: Dispatch) => {
    VideoRepository.createEntity(videoData)
      .then(updatedData =>
        dispatch(addVideo(Object.assign(videoData, updatedData)))
      )
      .catch(err => {
        console.log(err);
      });
  };
}

export function removeVideoDb(videoId: VideoType['id']) {
  return (dispatch: Dispatch) => {
    VideoRepository.deleteEntity(videoId)
      .then(() => dispatch(removeVideo(videoId)))
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchVideosBySectionDb(sectionId: SectionType['id']) {
  return (dispatch: Dispatch) => {
    if (sectionId) {
      VideoRepository.getVideosBySectionId(sectionId)
        .then((videos: Array<VideoType>) => {
          return dispatch(fetchVideosBySection(videos));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}
export function updateVideoDb(videoData: VideoType) {
  return (dispatch: Dispatch) => {
    VideoRepository.updateEntity(videoData)
      .then(updatedData =>
        dispatch(updateVideo(Object.assign(videoData, updatedData)))
      )
      .catch(err => {
        console.log(err);
      });
  };
}
