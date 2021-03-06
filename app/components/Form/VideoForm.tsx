/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { VideoActionCreatorType } from '../../actions/videos';
import { WrapperForm, FormButton, FormInput, FormLabel } from './FormStyle';
import { VideoType } from '../../reducers/entities/types';
import LightMediaPlayer from '../MediaPlayer/LightMediaPlayer';

type Props = VideoActionCreatorType & {
  closeModal: () => void;
  sectionId: string;
  data: VideoType | any;
};

const VideoForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState('');
  const [urlSelected, setUrlSelected] = useState(true);

  const { addVideoDb, closeModal, sectionId, data, updateVideoDb } = props;

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    setTitle(data.title);
    if (data.online) {
      setUrlSelected(true);
      setUrl(data.url);
    } else {
      setUrlSelected(false);
      setFile(data.url);
    }
  }, []);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const submittedUrl = urlSelected ? url : file;

    // Update Video

    if (Object.keys(data).length) {
      const updatedVideo = {
        ...data,
        title,
        url: submittedUrl,
        online: urlSelected
      };

      if (updateVideoDb) {
        updateVideoDb(updatedVideo);
        closeModal();
      }
      return;
    }

    // Add Video

    const video = {
      title,
      url: submittedUrl,
      online: urlSelected,
      watched: false,
      section: sectionId,
      createdAt: new Date()
    };

    if (addVideoDb) {
      addVideoDb(video);
      closeModal();
    }
  };

  const handleFileInputChange = (evt: React.SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    const selectedFile: File = (target.files as FileList)[0];
    setFile(selectedFile.path);
    setTitle(selectedFile.name);
  };

  const handleUrlInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
    setTitle('video');
  };

  const checkUrlButton: string = urlSelected ? 'bg-purple-500' : 'bg-gray-500';
  const checkFileButton: string = urlSelected ? 'bg-gray-500' : 'bg-purple-500';

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setUrlSelected(true)}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none ${checkUrlButton}`}
        >
          Online
        </button>
        <button
          type="button"
          onClick={() => setUrlSelected(false)}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none ${checkFileButton}`}
        >
          Offline
        </button>
      </div>
      {urlSelected ? (
        <div className="mt-5">
          <FormLabel>URL</FormLabel>
          <FormInput
            type="url"
            placeholder="url"
            onChange={e => handleUrlInputChange(e)}
            required
            defaultValue={url || ''}
          />
          {url && (
            <div className="w-auto h-72 bg-gray-200 mt-4">
              <LightMediaPlayer url={url} />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-5">
          <FormLabel>File</FormLabel>
          <FormInput type="file" onChange={e => handleFileInputChange(e)} />
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default VideoForm;
