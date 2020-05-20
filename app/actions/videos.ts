import { VideoType, SectionType } from '../reducers/entities/types';

export const ADD_VIDEO = 'ADD_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';

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

export type VideoActionCreatorType = {
  addVideo?: (videoData: VideoType, sectionId: SectionType['id']) => void;
  removeVideo?: (
    videoId: VideoType['id'],
    sectionId: SectionType['id']
  ) => void;
};

export type VideoActionType = AddVideoAction | RemoveVideoAction;

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
