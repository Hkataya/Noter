import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import CourseForm from '../Form/CourseForm';
import { CourseActionCreatorType } from '../../actions/courses';
import { EntityStateType, UIStateType } from '../../reducers/types';
import routes from '../../constants/routes.json';
import { UIActionCreatorType } from '../../actions/ui';

const CourseWrapper = styled.div.attrs({
  className: 'm-10 flex flex-wrap'
})``;

const HomeWrapper = styled.div.attrs({
  className: 'mx-auto p-5 bg-gray-100 align-center'
})``;

type Props = EntityStateType &
  CourseActionCreatorType &
  UIActionCreatorType &
  UIStateType;

export default function HomePage(props: Props) {
  const history = useHistory();
  const {
    courses,
    removeCourseDb,
    addCourseDb,
    fetchAllCoursesDb,
    updateCourseDb,
    openModal,
    closeModal,
    modal
  } = props;

  useEffect(() => {
    if (fetchAllCoursesDb) {
      console.log('Fetching Data');
      fetchAllCoursesDb();
    }
  }, []);

  return (
    <HomeWrapper>
      <h2>Home</h2>
      {modal.visible && modal.type === 'COURSE' && (
        <Modal
          handleClose={() => {
            if (closeModal) closeModal();
          }}
          title="Add Course"
        >
          <CourseForm
            updateCourseDb={updateCourseDb}
            addCourseDb={addCourseDb}
            closeModal={() => {
              if (closeModal) closeModal();
            }}
            data={modal.data}
          />
        </Modal>
      )}
      <SearchBar />
      <div className="flex justify-end mt-3">
        <Button
          onClick={() => {
            if (openModal) openModal({}, '', 'COURSE');
          }}
        >
          Add Course +
        </Button>
      </div>

      <CourseWrapper>
        {Object.keys(courses).map(k => (
          <CourseCard
            description={courses[k].description}
            key={k}
            title={courses[k].title}
            id={k}
            thumbnail={courses[k].thumbnail}
            removeCourse={() => {
              if (removeCourseDb) removeCourseDb(k);
            }}
            directToCoursePage={() => history.push(`${routes.COURSE}/${k}`)}
            updateCourse={() => {
              if (openModal) openModal(courses[k], '', 'COURSE');
            }}
          />
        ))}
      </CourseWrapper>
    </HomeWrapper>
  );
}
