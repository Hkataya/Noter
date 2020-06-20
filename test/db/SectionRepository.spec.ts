/* eslint-disable promise/no-nesting */
import SectionRepository from '../../app/db/SectionRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const sectionRepository = new SectionRepository(testdb, testrelDB);

  beforeAll(() => {
    testrelDB.rel
      .save('course', {
        id: '123',
        title: 'course',
        description: 'desc',
        videoCount: 0,
        progress: 0
      })
      .then(() =>
        testrelDB.rel.save('section', {
          id: '456',
          title: 'section1',
          course: '123',
          createdAt: new Date()
        })
      )
      .then(() =>
        testrelDB.rel.save('section', {
          id: '457',
          title: 'section2',
          course: '123',
          createdAt: new Date()
        })
      )
      .then(() =>
        testrelDB.rel.save('section', {
          id: '440',
          title: 'section3',
          course: '123',
          createdAt: new Date()
        })
      )
      .catch(e => {
        console.log(e);
      });
  });

  it('should create a section and return rev and id', () => {
    return sectionRepository
      .createEntity({ title: 'test', course: '123', createdAt: new Date() })
      .then(res => {
        expect(res.id).toBeTruthy();
        expect(res.rev).toBeTruthy();
        return null;
      });
  });

  it('should get all sections by specific course Id', () => {
    return sectionRepository.getSectionsByCourseId('123').then(data => {
      expect(data[0].course).toEqual('123');
      expect(data[1].course).toEqual('123');

      return null;
    });
  });
});
