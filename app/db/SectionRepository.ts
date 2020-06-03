import { db, relDB } from './db';
import Repository from './Repository';
import { SectionType, CourseType } from '../reducers/entities/types';

class SectionRepository extends Repository<SectionType> {
  constructor() {
    super(db, relDB, 'section');
  }

  getSectionsByCourseId = (courseId: CourseType['id']) => {
    return relDB.rel.find('course', courseId).then(data => data.sections);
  };
}

export default new SectionRepository();
