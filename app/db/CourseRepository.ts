import Repository from './Repository';
import { CourseType } from '../reducers/entities/types';
import sortArrayByDateCreated from '../utils/sortUtil';

class CourseRepository extends Repository<CourseType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'course');
  }

  getAllCourses = () => {
    return this.relDB.rel
      .find('course')
      .then(data => sortArrayByDateCreated(data.courses));
  };

  createEntity(entityData: Omit<CourseType, 'id'>) {
    return super.createEntity(entityData).then(updatedData => {
      this.relDB.rel.save('section', {
        title: 'Default Section',
        course: updatedData.id,
        createdAt: new Date()
      });
      return updatedData;
    });
  }

  getCourseContent = (courseId: CourseType['id']) => {
    return this.relDB.rel.find('course', courseId).then(data => {
      const sections = sortArrayByDateCreated(data.sections || []);
      const notes = sortArrayByDateCreated(data.notes || []);
      const videos = sortArrayByDateCreated(data.videos || []);
      return {
        sections,
        notes,
        videos
      };
    });
  };
}

export default CourseRepository;
