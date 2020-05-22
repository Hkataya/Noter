/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { SectionActionCreatorType } from '../../actions/sections';
import { FormInput, WrapperForm, FormLabel, FormButton } from './FormStyle';

type Props = SectionActionCreatorType & {
  closeModal: () => void;
  courseId: string;
};

const AddSectionForm = (props: Props) => {
  const [title, setTitle] = useState('');

  const { addSection, closeModal, courseId } = props;

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const section = {
      title,
      videos: []
    };

    if (addSection) {
      addSection(section, courseId);
      closeModal();
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div className="mt-5">
        <FormLabel>Section Title</FormLabel>
        <FormInput
          type="text"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default AddSectionForm;
