import { VideoType, CourseType } from '../reducers/entities/types';

export const ADD_VIDEO = 'ADD_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';

type AddVideoAction = {
  type: typeof ADD_VIDEO;
  payload: {
    courseId: CourseType['id'];
    videoId: VideoType['id'];
    videoData: VideoType;
  };
};

type RemoveVideoAction = {
  type: typeof REMOVE_VIDEO;
  payload: {
    videoId: VideoType['id'];
    courseId: CourseType['id'];
  };
};

export type VideoActionCreatorType = {
  addVideo?: (videoData: VideoType, courseId: CourseType['id']) => void;
  removeVideo?: (videoId: VideoType['id'], courseId: CourseType['id']) => void;
};

export type VideoActionType = AddVideoAction | RemoveVideoAction;

export function addVideo(videoData: VideoType, courseId: CourseType['id']) {
  // Generate Unique ID
  const videoId = Date.now().toString();
  const video = {
    id: videoId,
    ...videoData
  };
  return {
    type: ADD_VIDEO,
    payload: {
      courseId,
      videoId,
      videoData: video
    }
  };
}

export function removeVideo(
  videoId: VideoType['id'],
  courseId: CourseType['id']
) {
  return {
    type: REMOVE_VIDEO,
    payload: {
      videoId,
      courseId
    }
  };
}
