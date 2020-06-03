import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';
import CourseCard from '../CourseCard/CourseCard';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import CourseForm from '../Form/CourseForm';
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
  const { courses, removeCourseDb, addCourseDb, fetchAllCoursesDb } = props;

  useEffect(() => {
    if (fetchAllCoursesDb) {
      console.log('Fetching Data');
      fetchAllCoursesDb();
    }
  }, []);

  return (
    <HomeWrapper>
      <h2>Home</h2>
      {modalVisibile && (
        <Modal handleClose={() => setModalVisible(false)} title="Add Course">
          <CourseForm
            addCourseDb={addCourseDb}
            closeModal={() => setModalVisible(false)}
          />
        </Modal>
      )}
      <SearchBar />
      <div className="flex justify-end mt-3">
        <Button onClick={() => setModalVisible(true)}>Add Course +</Button>
      </div>

      <CourseWrapper>
        {Object.keys(courses).map(k => (
          <CourseCard
            key={k}
            title={courses[k].title}
            id={k}
            duration={courses[k].duration}
            thumbnail={courses[k].thumbnail}
            removeCourse={() => {
              if (removeCourseDb) removeCourseDb(k);
            }}
            directToCoursePage={() => history.push(`${routes.COURSE}/${k}`)}
          />
        ))}
      </CourseWrapper>
    </HomeWrapper>
  );
}
