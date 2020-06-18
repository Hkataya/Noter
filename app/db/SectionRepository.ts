import Repository from './Repository';
import { SectionType, CourseType } from '../reducers/entities/types';

class SectionRepository extends Repository<SectionType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'section');
  }

  getSectionsByCourseId = (courseId: CourseType['id']) => {
    return this.relDB.rel
      .findHasMany('section', 'course', courseId)
      .then(data => data.sections);
  };
}

export default SectionRepository;
