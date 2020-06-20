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
        course: updatedData.id
      });
      return updatedData;
    });
  }
}

export default CourseRepository;
