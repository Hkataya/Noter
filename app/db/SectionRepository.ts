/* eslint-disable promise/no-nesting */
import Repository from './Repository';
import sortArrayByDateCreated from '../utils/sortUtil';
import { SectionType, CourseType } from '../reducers/entities/types';

class SectionRepository extends Repository<SectionType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'section');
  }

  deleteEntity(entityId: string) {
    return this.relDB.rel.find('section', entityId).then(data => {
      return super.deleteEntity(entityId).then(response => {
        return this.getCourseAndUpdateVideoCount(data.sections[0].course).then(
          () => {
            return response;
          }
        );
      });
    });
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

  getCourseAndUpdateVideoCount = (courseId: string) => {
    return this.relDB.rel.find('course', courseId).then(data => {
      const course = data.courses[0];
      const videoCount = data.videos ? data.videos.length : 0;
      course.videoCount = videoCount;
      return this.relDB.rel.save('course', course);
    });
  };
}

export default SectionRepository;
