import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Resizable } from 're-resizable';
import Collapse from '@kunukn/react-collapse';
import Modal from '../Modal/Modal';
import routes from '../../constants/routes.json';
import TitleBar from '../TitleBar/TitleBar';
import { EntityStateType } from '../../reducers/types';
import { VideoActionCreatorType } from '../../actions/videos';
import { SectionActionCreatorType } from '../../actions/sections';
import { CourseType } from '../../reducers/entities/types';
import SectionForm from '../Form/SectionForm';
import SectionListContainer from '../SectionList/SectionListContainer';
import { UIActionCreatorType } from '../../actions/ui';
import { ModalType } from '../../reducers/ui/types';
import Button from '../Button/Button';
import TabList from '../TabList/TabList';

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
    addSectionDb,
    updateSectionDb,
    modal,
    currentlySelected,
    closeModal,
    openModal
  } = props;

  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {modal.visible && modal.type === 'SECTION' && (
        <Modal
          title="Add Section"
          handleClose={() => {
            if (closeModal) closeModal();
          }}
        >
          <SectionForm
            closeModal={() => {
              if (closeModal) closeModal();
            }}
            courseId={modal.parentId || ''}
            addSectionDb={addSectionDb}
            updateSectionDb={updateSectionDb}
            data={modal.data}
          />
        </Modal>
      )}
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-x mt-3 ml-3" />
      </Link>
      <div className="flex justify-end mt-3 mr-5">
        <Button
          onClick={() => {
            if (openModal) openModal({}, course.id, 'SECTION');
          }}
        >
          Add Section +
        </Button>
      </div>

      <TitleBar title={course.title} />
      <div className="w-full h-full bg-gray-100 flex-grow flex overflow-visible">
        <Resizable minWidth="30%" maxWidth="70%">
          <div className="h-full p-4 overflow-y-scroll overflow-x-hidden">
            <SectionListContainer courseId={course.id} />
          </div>
        </Resizable>
        <div className="bg-gray-800 h-full p-5 overflow-y-scroll overflow-x-hidden flex-auto">
          <div className="bg-gray-100 rounded-lg p-2 ">
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setOpen(!open)}
            >
              Description
            </button>
            <Collapse
              transition="height 300ms cubic-bezier(.4, 0, .2, 1)"
              isOpen={open}
            >
              <p>{course.description}</p>
            </Collapse>
          </div>

          <TabList itemId={currentlySelected} />
        </div>
      </div>
    </div>
  );
}
