/* eslint-disable promise/no-nesting */
import Repository from './Repository';
import sortArrayByDateCreated from '../utils/sortUtil';
import { SectionType, CourseType } from '../reducers/entities/types';

class SectionRepository extends Repository<SectionType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'section');
  }

  getSectionsByCourseId = (courseId: CourseType['id']) => {
    return this.db
      .createIndex({ index: { fields: ['data.course', '_id'] } })
      .then(() => {
        return this.relDB.rel
          .findHasMany('section', 'course', courseId)
          .then(data => sortArrayByDateCreated(data.sections));
      });
  };
}

export default SectionRepository;
