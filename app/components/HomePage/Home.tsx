import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Home.css';
import CourseCard from '../CourseCard/CourseCard';
import SearchBar from '../SearchBar/SearchBar';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <CourseCard />
      <SearchBar />
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
