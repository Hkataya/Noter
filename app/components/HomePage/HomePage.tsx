import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AddCourseForm from '../Form/AddCourseForm';
import { CourseActionCreatorType } from '../../actions/courses';
import { EntityStateType } from '../../reducers/types';
import routes from '../../constants/routes.json';

const CourseWrapper = styled.div.attrs({
  className: 'm-10 flex flex-wrap'
})``;

const HomeWrapper = styled.div.attrs({
  className: 'mx-auto p-5 bg-gray-100 align-center'
})``;

type Props = EntityStateType & CourseActionCreatorType;

export default function HomePage(props: Props) {
  const [modalVisibile, setModalVisible] = useState(false);
  const history = useHistory();
  const { courses, removeCourse, addCourse } = props;

  return (
    <HomeWrapper>
      <h2>Home</h2>
      {modalVisibile && (
        <Modal handleClose={() => setModalVisible(false)} title="Add Course">
          <AddCourseForm
            addCourse={addCourse}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>
      )}
      <SearchBar />
      <Button handleButtonClick={() => setModalVisible(true)}>
        Add Course +
      </Button>
      <CourseWrapper>
        {Object.keys(courses).map(k => (
          <CourseCard
            key={k}
            title={courses[k].title}
            id={k}
            sections={courses[k].sections}
            duration={courses[k].duration}
            thumbnail={courses[k].thumbnail}
            removeCourse={removeCourse}
            directToCoursePage={() => history.push(`${routes.COURSE}/${k}`)}
          />
        ))}
      </CourseWrapper>
    </HomeWrapper>
  );
}
