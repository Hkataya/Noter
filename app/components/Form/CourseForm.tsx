import React, { useState } from 'react';
import { CourseActionCreatorType } from '../../actions/courses';
import { CourseType } from '../../reducers/entities/types';
import { WrapperForm, FormButton, FormInput, FormLabel } from './FormStyle';

type Props = CourseActionCreatorType & {
  closeModal: () => void;
};

const CourseForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { addCourse, closeModal } = props;

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const course: CourseType = {
      title,
      description,
      sections: [],
      duration: '0'
    };

    if (addCourse) {
      addCourse(course);
      closeModal();
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div className="mt-5">
        <FormLabel>Course Title</FormLabel>
        <FormInput
          type="text"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <FormLabel> Course Description</FormLabel>
        <FormInput
          type="text"
          placeholder="description"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default CourseForm;
