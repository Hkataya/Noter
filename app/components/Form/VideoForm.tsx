/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { VideoActionCreatorType } from '../../actions/videos';
import { WrapperForm, FormButton, FormInput, FormLabel } from './FormStyle';
import { VideoType } from '../../reducers/entities/types';

type Props = VideoActionCreatorType & {
  closeModal: () => void;
  sectionId: string;
  data: VideoType | any;
};

const VideoForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { addVideoDb, closeModal, sectionId, data, updateVideoDb } = props;
  useEffect(() => {
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.url) setUrl(data.url);
    }
  }, []);
  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (Object.keys(data).length) {
      const updatedVideo = { ...data };
      updatedVideo.title = title;
      updatedVideo.url = url;
      if (updateVideoDb) {
        updateVideoDb(updatedVideo);
        closeModal();
      }
      return;
    }
    const video = {
      title,
      url,
      thumbnail: '',
      watched: false,
      section: sectionId
    };

    if (addVideoDb) {
      addVideoDb(video);
      closeModal();
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div className="mt-5">
        <FormLabel>Title</FormLabel>
        <FormInput
          type="text"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
          required
          defaultValue={data.title || ''}
        />
      </div>

      <div className="mt-5">
        <FormLabel>URL</FormLabel>
        <FormInput
          type="url"
          placeholder="url"
          onChange={e => setUrl(e.target.value)}
          required
          defaultValue={data.url || ''}
        />
      </div>

      <div>
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default VideoForm;
