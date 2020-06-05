/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { VideoActionCreatorType } from '../../actions/videos';
import { WrapperForm, FormButton, FormInput, FormLabel } from './FormStyle';

type Props = VideoActionCreatorType & {
  closeModal: () => void;
  sectionId: string;
};

const VideoForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const { addVideoDb, closeModal, sectionId } = props;

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
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
        />
      </div>

      <div className="mt-5">
        <FormLabel>URL</FormLabel>
        <FormInput
          type="url"
          placeholder="url"
          onChange={e => setUrl(e.target.value)}
        />
      </div>

      <div>
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default VideoForm;
