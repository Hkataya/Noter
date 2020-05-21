import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import routes from '../../constants/routes.json';
import TitleBar from '../TitleBar/TitleBar';
import { EntityStateType } from '../../reducers/types';
import { VideoActionCreatorType } from '../../actions/videos';
import AddVideoForm from '../Form/AddVideoForm';
import { SectionActionCreatorType } from '../../actions/sections';
import { CourseType } from '../../reducers/entities/types';
import AddSectionForm from '../Form/AddSectionForm';
import SectionListContainer from '../SectionList/SectionListContainer';
import { UIActionCreatorType } from '../../actions/ui';
import { ModalType } from '../../reducers/ui/types';

type Props = EntityStateType &
  VideoActionCreatorType &
  UIActionCreatorType &
  SectionActionCreatorType & {
    course: CourseType;
    modal: ModalType;
  };

export default function CoursePage(props: Props) {
  const { course, addVideo, addSection, modal, closeModal, openModal } = props;
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {modal.visible && modal.type === 'VIDEO' && (
        <Modal
          title="Add Video"
          handleClose={() => {
            if (closeModal) closeModal();
          }}
        >
          <AddVideoForm
            closeModal={() => {
              if (closeModal) closeModal();
            }}
            sectionId={modal.parentId || ''}
            addVideo={addVideo}
          />
        </Modal>
      )}
      {modal.visible && modal.type === 'SECTION' && (
        <Modal
          title="Add Section"
          handleClose={() => {
            if (closeModal) closeModal();
          }}
        >
          <AddSectionForm
            closeModal={() => {
              if (closeModal) closeModal();
            }}
            courseId={modal.parentId || ''}
            addSection={addSection}
          />
        </Modal>
      )}
      <button
        type="button"
        onClick={() => {
          if (openModal) openModal({}, 'SECTION', course.id);
        }}
      >
        Add Section +
      </button>
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
