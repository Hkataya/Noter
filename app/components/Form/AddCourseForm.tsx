/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { CourseActionCreatorType } from '../../actions/courses';

type Props = CourseActionCreatorType & {
  closeModal: () => void;
};

const AddCourseForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { addCourse, closeModal } = props;

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const course = {
      title,
      description,
      videos: [],
      chapters: [],
      duration: '0'
    };

    if (addCourse) {
      addCourse(course);
      closeModal();
    }
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Course Title
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="title"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-username"
          >
            Course Description
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="description"
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3" />
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCourseForm;
