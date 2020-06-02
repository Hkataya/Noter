import CourseRepository from '../../app/db/CourseRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const courseRepository = new CourseRepository(testdb, testrelDB);
  it('should create a course and return rev and id', () => {
    return courseRepository
      .createEntity({ title: 'test', description: 'desc' })
      .then(res => {
        console.log(res);
        expect(res.id).toBeTruthy();
        return null;
      });
  });
});
