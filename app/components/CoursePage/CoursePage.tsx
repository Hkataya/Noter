import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import routes from '../../constants/routes.json';
import TitleBar from '../TitleBar/TitleBar';
import { EntityStateType } from '../../reducers/types';
import { VideoActionCreatorType } from '../../actions/videos';
import AddVideoForm from '../Form/AddVideoForm';
import { SectionActionCreatorType } from '../../actions/sections';
import { CourseType, SectionType } from '../../reducers/entities/types';
import AddSectionForm from '../Form/AddSectionForm';
import SectionListContainer from '../SectionList/SectionListContainer';

type Props = EntityStateType &
  VideoActionCreatorType &
  SectionActionCreatorType & {
    course: CourseType;
    sections: Array<SectionType>;
  };

export default function CoursePage(props: Props) {
  const { course, addVideo, addSection } = props;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <button type="button">Add Section +</button>
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-2x mt-3 ml-3" />
      </Link>
      <TitleBar title={course.title} />
      <div className="w-full bg-gray-100 flex-grow">
        <div className="h-full flex flex-row">
          <div className=" w-2/4 h-full p-5 overflow-y-scroll">
            <SectionListContainer courseId={course.id} />
          </div>
          <div className="bg-purple-900 w-2/4 h-full p-5 overflow-y-scroll" />
        </div>
      </div>
    </div>
  );
}
