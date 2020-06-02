import { db, relDB } from './db';
import CourseRepository from './CourseRepository';

export default new CourseRepository(db, relDB);
