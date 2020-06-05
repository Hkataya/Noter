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

  const { addSectionDb, closeModal, courseId } = props;

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const section = {
      title,
      course: courseId
    };

    if (addSectionDb) {
      addSectionDb(section);
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
          required
        />
      </div>
      <div className="mt-5">
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default AddSectionForm;
