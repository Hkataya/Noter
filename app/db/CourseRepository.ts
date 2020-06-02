import Repository from './Repository';
import { CourseType } from '../reducers/entities/types';

class CourseRepository extends Repository<CourseType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'course');
  }
}

export default CourseRepository;
