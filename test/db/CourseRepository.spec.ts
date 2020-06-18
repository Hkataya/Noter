/* eslint-disable promise/no-nesting */
import CourseRepository from '../../app/db/CourseRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const courseRepository = new CourseRepository(testdb, testrelDB);
  it('should create a course and return rev and id', () => {
    return courseRepository
      .createEntity({ title: 'test', description: 'desc' })
      .then(res => {
        expect(res.id).toBeTruthy();
        return null;
      });
  });

  it('should create a course and an accompanying default section', () => {
    return courseRepository
      .createEntity({ title: 'test2', description: 'desc2' })
      .then(res => {
        return courseRepository.relDB.rel
          .find('course', res.id)
          .then(courseData => {
            expect(res.id).toBeTruthy();
            expect(courseData.sections[0]).toBeTruthy();
            expect(courseData.sections[0].title).toEqual('Default Section');
            return null;
          });
      });
  });

  it('should delete a course', () => {
    return courseRepository
      .createEntity({ title: 'test', description: 'desc' })
      .then(res => {
        return courseRepository.deleteEntity(res.id).then(() => {
          return courseRepository.relDB.rel
            .find('course', res.id)
            .then(coursesData => {
              expect(coursesData.courses).toHaveLength(0);
              return null;
            });
        });
      });
  });

  it('should update a course', () => {
    return courseRepository
      .createEntity({ title: 'test', description: 'desc' })
      .then(res => {
        const updatedCourseData = {
          id: res.id,
          rev: res.rev,
          title: 'UpdatedTest',
          description: 'UpdatedDesc'
        };
        return courseRepository.updateEntity(updatedCourseData).then(() => {
          return courseRepository.relDB.rel
            .find('course', res.id)
            .then(updatedData => {
              expect(updatedData.courses[0].id).toEqual(res.id);
              expect(updatedData.courses[0].title).toEqual(
                updatedCourseData.title
              );
              expect(updatedData.courses[0].description).toEqual(
                updatedCourseData.description
              );
              return null;
            });
        });
      });
  });
});
