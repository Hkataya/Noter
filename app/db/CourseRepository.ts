import { db, relDB } from './db';
import Repository from './Repository';
import { CourseType } from '../reducers/entities/types';

class CourseRepository extends Repository<CourseType> {
  constructor() {
    super(db, relDB, 'course');
  }
}

export default new CourseRepository();
