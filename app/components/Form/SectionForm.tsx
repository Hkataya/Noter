/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { SectionActionCreatorType } from '../../actions/sections';
import { FormInput, WrapperForm, FormLabel, FormButton } from './FormStyle';
import { SectionType } from '../../reducers/entities/types';

type Props = SectionActionCreatorType & {
  closeModal: () => void;
  courseId: string;
  data: SectionType | any;
};

const AddSectionForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const { addSectionDb, updateSectionDb, closeModal, courseId, data } = props;

  useEffect(() => {
    if (data && data.title) setTitle(data.title);
  }, []);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    if (Object.keys(data).length !== 0) {
      const updatedSection = { ...data };
      updatedSection.title = title;
      if (updateSectionDb) {
        updateSectionDb(updatedSection);
        closeModal();
      }
      return;
    }

    const section = {
      title,
      course: courseId,
      createdAt: new Date()
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
          defaultValue={data.title || ''}
        />
      </div>
      <div className="mt-5">
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default AddSectionForm;
