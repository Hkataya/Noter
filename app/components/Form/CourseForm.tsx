import React, { useState, useEffect } from 'react';
import { CourseActionCreatorType } from '../../actions/courses';
import { WrapperForm, FormButton, FormInput, FormLabel } from './FormStyle';
import { CourseType } from '../../reducers/entities/types';

type Props = CourseActionCreatorType & {
  closeModal: () => void;
  data: CourseType | any;
};

const CourseForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addCourseDb, updateCourseDb, closeModal, data } = props;

  useEffect(() => {
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
    }
  }, []);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    if (Object.keys(data).length) {
      const updatedCourse = { ...data };
      updatedCourse.title = title;
      updatedCourse.description = description;
      if (updateCourseDb) {
        updateCourseDb(updatedCourse);
        closeModal();
      }
      return;
    }

    const course = {
      title,
      description,
      duration: '0'
    };

    if (addCourseDb) {
      addCourseDb(course);
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
          name="title"
          onChange={e => setTitle(e.target.value)}
          required
          defaultValue={data.title || ''}
        />
      </div>
      <div className="mt-5">
        <FormLabel> Course Description</FormLabel>
        <FormInput
          type="text"
          name="description"
          placeholder="description"
          onChange={e => {
            setDescription(e.target.value);
          }}
          required
          defaultValue={data.description || ''}
        />
      </div>
      <div className="mt-5">
        <FormButton type="submit">Done</FormButton>
      </div>
    </WrapperForm>
  );
};

export default CourseForm;
