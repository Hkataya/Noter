import React from 'react';
import { Link } from 'react-router-dom';
import { Resizable } from 're-resizable';
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
import Button from '../Button/Button';
import NoteListContainer from '../NoteList/NoteListContainer';

type Props = EntityStateType &
  VideoActionCreatorType &
  UIActionCreatorType &
  SectionActionCreatorType & {
    course: CourseType;
    modal: ModalType;
    currentlySelected: string;
  };

export default function CoursePage(props: Props) {
  const {
    course,
    addVideo,
    addSection,
    modal,
    currentlySelected,
    closeModal,
    openModal
  } = props;
  return (
    <div className="h-screen flex flex-col">
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
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-x mt-3 ml-3" />
      </Link>
      <div className="flex justify-end mt-3 mr-5">
        <Button
          handleButtonClick={() => {
            if (openModal) openModal({}, 'SECTION', course.id);
          }}
        >
          Add Section +
        </Button>
      </div>

      <TitleBar title={course.title} />
      <div className="w-full bg-gray-100 flex-grow flex">
        <Resizable minWidth={450}>
          <div className="h-full p-4">
            <SectionListContainer courseId={course.id} />
          </div>
        </Resizable>

        <div className="bg-gray-800 h-full p-5 flex-auto">
          <NoteListContainer videoId={currentlySelected} />
        </div>
      </div>
    </div>
  );
}
