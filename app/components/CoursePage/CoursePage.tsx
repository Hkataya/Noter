import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Resizable } from 're-resizable';
import Collapse from '@kunukn/react-collapse';
import Modal from '../Modal/Modal';
import routes from '../../constants/routes.json';
import TitleBar from '../TitleBar/TitleBar';
import { EntityStateType } from '../../reducers/types';
import { VideoActionCreatorType } from '../../actions/videos';
import { SectionActionCreatorType } from '../../actions/sections';
import { CourseType, NoteShapeType } from '../../reducers/entities/types';
import SectionForm from '../Form/SectionForm';
import SectionListContainer from '../SectionList/SectionListContainer';
import { UIActionCreatorType } from '../../actions/ui';
import { ModalType } from '../../reducers/ui/types';
import Button from '../Button/Button';
import TabList from '../TabList/TabList';
import { CourseActionCreatorType } from '../../actions/courses';
import NoteListContainer from '../NoteList/NoteListContainer';
import formType from '../../constants/form-types.json';

// **** Style Section **** //

const CoursePageWrapper = styled.div.attrs({
  className: 'h-screen flex flex-col overflow-hidden'
})``;
const ButtonWrapper = styled.div.attrs({
  className: 'flex justify-end mt-3 mr-5'
})``;
const MainView = styled.div.attrs({
  className: 'w-full h-full bg-gray-100 flex-grow flex overflow-visible'
})``;
const LeftWrapper = styled.div.attrs({
  className: 'h-full p-4 overflow-y-scroll overflow-x-hidden'
})``;
const RightWrapper = styled.div.attrs({
  className: 'bg-gray-800 h-full p-4 flex flex-col flex-auto'
})``;
const CourseDescriptionWrapper = styled.div.attrs({
  className: 'bg-purple-600 text-white rounded-lg p-2'
})``;
const CourseDescriptionHeader = styled.div.attrs({
  className: 'flex justify-between'
})``;
// **** Prop Types Section **** //

type Props = EntityStateType &
  VideoActionCreatorType &
  UIActionCreatorType &
  CourseActionCreatorType &
  SectionActionCreatorType & {
    course: CourseType;
    modal: ModalType;
    currentlySelected: string;
  };

// **** Component Section **** //

export default function CoursePage(props: Props) {
  const {
    course,
    addSectionDb,
    updateSectionDb,
    modal,
    currentlySelected,
    fetchCourseContentDb,
    closeModal,
    openModal,
    setCurrentlySelected
  } = props;

  useEffect(() => {
    if (fetchCourseContentDb) fetchCourseContentDb(course.id);
    if (setCurrentlySelected) setCurrentlySelected('');
  }, []);

  const [open, setOpen] = useState(true);

  return (
    <CoursePageWrapper>
      {modal.visible && modal.type === formType.SECTION && (
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

      <ButtonWrapper>
        <Button
          onClick={() => {
            if (openModal) openModal({}, course.id, formType.SECTION);
          }}
        >
          Add Section +
        </Button>
      </ButtonWrapper>

      <TitleBar title={course.title} />

      <MainView>
        <Resizable
          defaultSize={{
            width: '60%',
            height: 'auto'
          }}
          minWidth="40%"
          maxWidth="70%"
        >
          <LeftWrapper>
            <SectionListContainer courseId={course.id} />
          </LeftWrapper>
        </Resizable>

        <RightWrapper>
          <CourseDescriptionWrapper>
            <CourseDescriptionHeader>
              <h1 className="font-semibold"> Course Description </h1>
              <button
                className="focus:outline-none pr-2"
                type="button"
                onClick={() => setOpen(!open)}
              >
                <i
                  className={`fas fa-chevron-right  ${
                    open ? 'icon-rotate down' : 'icon-rotate'
                  }`}
                />
              </button>
            </CourseDescriptionHeader>
            <Collapse
              transition="height 300ms cubic-bezier(.4, 0, .2, 1)"
              isOpen={open}
            >
              <hr className="mt-3 border-gray-500" />

              <p className="mt-3">{course.description}</p>
            </Collapse>
          </CourseDescriptionWrapper>

          <TabList
            tabItems={['Notes', 'Voice Notes']}
            componentsArray={[
              <NoteListContainer
                key={0}
                videoId={currentlySelected}
                type={NoteShapeType.note}
              />,
              <NoteListContainer
                key={1}
                videoId={currentlySelected}
                type={NoteShapeType.audio}
              />
            ]}
          />
        </RightWrapper>
      </MainView>
    </CoursePageWrapper>
  );
}
