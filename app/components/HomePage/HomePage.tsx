import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import LoginModal from '../LoginModal';
import CourseForm from '../Form/CourseForm';
import LoginForm from '../Form/LoginForm';
import { CourseActionCreatorType } from '../../actions/courses';
import { EntityStateType, UIStateType } from '../../reducers/types';
import routes from '../../constants/routes.json';
import { UIActionCreatorType } from '../../actions/ui';
import formTypes from '../../constants/form-types.json';

// **** Style Section **** //

const CourseWrapper = styled.div.attrs({
  className: 'm-10 flex flex-wrap'
})``;

const HomeWrapper = styled.div.attrs({
  className: 'mx-auto p-5 bg-gray-100 align-center'
})``;
const ButtonWrapper = styled.div.attrs({
  className: 'flex justify-end mt-3'
})``;

// **** Prop Types Section **** //

type Props = EntityStateType &
  CourseActionCreatorType &
  UIActionCreatorType &
  UIStateType;

// **** Component Section **** //

export default function HomePage(props: Props) {
  const history = useHistory();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(true);
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
    if (fetchAllCoursesDb) fetchAllCoursesDb();
  }, []);

  return (
    <HomeWrapper>
      {modal.visible && modal.type === formTypes.COURSE && (
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

      {isOpenLoginModal ? (
        <Modal
          handleClose={() => {
            setIsOpenLoginModal(false);
          }}
          title="Login"
        >
          <LoginForm />
        </Modal>
      ) : (
        ''
      )}
      <SearchBar />
      <ButtonWrapper>
        <Button
          onClick={() => {
            if (openModal) openModal({}, '', formTypes.COURSE);
          }}
        >
          Add Course +
        </Button>
        <Button
          onClick={() => {
            if (!isOpenLoginModal) setIsOpenLoginModal(true);
          }}
        >
          Login
        </Button>
      </div>
      </ButtonWrapper>

      <CourseWrapper>
        {Object.keys(courses).map(k => (
          <CourseCard
            createdAt={courses[k].createdAt}
            videoCount={courses[k].videoCount}
            description={courses[k].description}
            key={k}
            title={courses[k].title}
            id={k}
            thumbnail="static/images/background-01.png"
            removeCourse={() => {
              if (removeCourseDb) removeCourseDb(k);
            }}
            directToCoursePage={() => history.push(`${routes.COURSE}/${k}`)}
            updateCourse={() => {
              if (openModal) openModal(courses[k], '', formTypes.COURSE);
            }}
          />
        ))}
      </CourseWrapper>
    </HomeWrapper>
  );
}
