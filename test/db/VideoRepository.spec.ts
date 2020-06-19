/* eslint-disable promise/no-nesting */
import VideoRepository from '../../app/db/VideoRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const videoRepository = new VideoRepository(testdb, testrelDB);

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
        online: false,
        title: 'test',
        url: 'testurl',
        watched: false,
        section: '456'
      })
      .then(res => {
        expect(res.id).toBeTruthy();
        expect(res.rev).toBeTruthy();
        return null;
      });
  });

  it('should create a video and get courseId', () => {
    return videoRepository
      .createEntity({
        online: false,
        title: 'test2',
        url: 'testurl',
        watched: false,
        section: '456'
      })
      .then(res => {
        return videoRepository.getRelatedCourseId('456').then(returnedId => {
          expect(res.id).toBeTruthy();
          expect(res.rev).toBeTruthy();
          expect(returnedId).toBe('123');
          return null;
        });
      });
  });

  it('should create a video and update its parent course accordingly', () => {
    return videoRepository
      .createEntity({
        online: false,
        title: 'test3',
        url: 'testurl',
        watched: false,
        section: '456'
      })
      .then(res => {
        return videoRepository.getRelatedCourseId('456').then(returnedId => {
          return videoRepository.relDB.rel
            .find('course', returnedId)
            .then(data => {
              expect(res.id).toBeTruthy();
              expect(res.rev).toBeTruthy();
              expect(returnedId).toBe('123');
              expect(data.courses[0].id).toBe('123');
              expect(data.courses[0].videoCount).toBe(3);
              return null;
            });
        });
      });
  });

  it('should delete a video and update its parent course accordingly', () => {
    return videoRepository.getVideosBySectionId('456').then(videos => {
      const video = videos[0];
      return videoRepository.deleteEntity(video.id).then(() => {
        return videoRepository.getRelatedCourseId('456').then(returnedId => {
          return videoRepository.relDB.rel
            .find('course', returnedId)
            .then(data => {
              expect(returnedId).toBe('123');
              expect(data.courses[0].id).toBe('123');
              expect(data.courses[0].videoCount).toBe(2);
              return null;
            });
        });
      });
    });
  });
});
