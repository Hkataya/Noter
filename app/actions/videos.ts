import { VideoType, SectionType } from '../reducers/entities/types';
import { Dispatch } from '../reducers/types';
import  VideoRepository from '../db/VideoRepository';

export const ADD_VIDEO = 'ADD_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const TOGGLE_WATCHED = 'TOGGLE_WATCHED';
export const FETCH_VIDEOS_BY_SECTION = 'FETCH_VIDEOS_BY_SECTION';

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
  addVideoDb?: (videoData: VideoType) => any;
  removeVideoDb?: (videoId: VideoType['id']) => any;
  toggleWatched?: (videoId: VideoType['id']) => void;
  fetchVideosBySectionDb?: (sectionId: SectionType['id']) => any;
};

export type VideoActionType =
  | AddVideoAction
  | RemoveVideoAction
  | ToggleWatchedAction
  | FetchVideosBySectionAction;

export function addVideo(videoData: VideoType) {
  const videoId = videoData.id;
  const video = {
    id: videoId,
    ...videoData
  };
  return {
    type: ADD_VIDEO,
    payload: {
      videoId,
      videoData: video
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

export function addVideoDb(videoData: VideoType) {
  return (dispatch: Dispatch) => {
    VideoRepository.createEntity(videoData)
      .then(updatedData => {
        Object.assign(videoData, updatedData);
        return dispatch(addVideo(videoData));
      })
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
