/* eslint-disable promise/no-nesting */
import SectionRepository from '../../app/db/SectionRepository';
import CourseRepository from '../../app/db/CourseRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const courseRepository = new CourseRepository(testdb, testrelDB);
  const sectionRepository = new SectionRepository(testdb, testrelDB);
  it('should create a section and return rev and id', () => {
    return sectionRepository
      .createEntity({ title: 'test', course: '123' })
      .then(res => {
        expect(res.id).toBeTruthy();
        return null;
      });
  });

  it('should get all sections by specific course Id', () => {
    return courseRepository
      .createEntity({ title: 'test', description: 'desc' })
      .then(res => {
        return sectionRepository
          .createEntity({
            title: 'section2',
            course: res.id
          })
          .then(() => {
            return sectionRepository
              .getSectionsByCourseId(res.id)
              .then(data => {
                expect(data[0].course).toEqual(res.id);
                expect(data[1].course).toEqual(res.id);
                return null;
              });
          });
      });
  });
});
