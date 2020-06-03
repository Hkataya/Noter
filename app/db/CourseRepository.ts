import Repository from './Repository';
import { CourseType } from '../reducers/entities/types';
import SectionRepository from './SectionRepository';

class CourseRepository extends Repository<CourseType> {
  constructor(db: PouchDB.Database, relDB: PouchDB.RelDatabase) {
    super(db, relDB, 'course');
  }

  getAllCourses = () => {
    return this.relDB.rel.find('course').then(data => data.courses);
  };

  async createEntity(entityData: Omit<CourseType, 'id'>) {
    const course = await super.createEntity(entityData);
    const defaultSection = await SectionRepository.createEntity({
      title: 'Default Section',
      course: course.id
    });
    return course;
  }
}

export default CourseRepository;
