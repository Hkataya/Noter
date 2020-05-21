import { VideoType, SectionType } from '../reducers/entities/types';

export const ADD_VIDEO = 'ADD_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const TOGGLE_WATCHED = 'TOGGLE_WATCHED';

type AddVideoAction = {
  type: typeof ADD_VIDEO;
  payload: {
    sectionId: SectionType['id'];
    videoId: VideoType['id'];
    videoData: VideoType;
  };
};

type RemoveVideoAction = {
  type: typeof REMOVE_VIDEO;
  payload: {
    videoId: VideoType['id'];
    sectionId: SectionType['id'];
  };
};

type ToggleWatchedAction = {
  type: typeof TOGGLE_WATCHED;
  payload: {
    videoId: VideoType['id'];
  };
};

export type VideoActionCreatorType = {
  addVideo?: (videoData: VideoType, sectionId: SectionType['id']) => void;
  removeVideo?: (
    videoId: VideoType['id'],
    sectionId: SectionType['id']
  ) => void;
  toggleWatched?: (videoId: VideoType['id']) => void;
};

export type VideoActionType =
  | AddVideoAction
  | RemoveVideoAction
  | ToggleWatchedAction;

export function addVideo(videoData: VideoType, sectionId: SectionType['id']) {
  // Generate Unique ID
  const videoId = Date.now().toString();
  const video = {
    id: videoId,
    ...videoData
  };
  return {
    type: ADD_VIDEO,
    payload: {
      sectionId,
      videoId,
      videoData: video
    }
  };
}

export function removeVideo(
  videoId: VideoType['id'],
  sectionId: SectionType['id']
) {
  return {
    type: REMOVE_VIDEO,
    payload: {
      videoId,
      sectionId
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
