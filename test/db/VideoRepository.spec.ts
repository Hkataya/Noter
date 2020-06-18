/* eslint-disable promise/no-nesting */
import VideoRepository from '../../app/db/VideoRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const videoRepository = new VideoRepository(testdb, testrelDB);

  beforeAll(() => {
    testrelDB.rel
      .save('course', { id: '123', title: 'course', description: 'desc' })
      .then(() =>
        testrelDB.rel.save('section', {
          id: '456',
          title: 'section',
          course: '123'
        })
      )
      .catch(e => {
        console.log(e);
      });
  });

  it('should create a video and return rev and id', () => {
    return videoRepository
      .createEntity({
        title: 'test',
        url: 'testurl',
        watched: false,
        section: '123'
      })
      .then(res => {
        expect(res.id).toBeTruthy();
        return null;
      });
  });

  it('should create a course, section and video and get courseId', () => {
    return videoRepository
      .createEntity({
        title: 'test',
        url: 'testurl',
        watched: false,
        section: '456'
      })
      .then(res => {
        return videoRepository.getRelatedCourseId('456').then(returnedId => {
          expect(res.id).toBeTruthy();
          expect(returnedId).toBe('123');
          return null;
        });
      });
  });
});
