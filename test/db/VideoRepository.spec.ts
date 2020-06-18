import VideoRepository from '../../app/db/VideoRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const videoRepository = new VideoRepository(testdb, testrelDB);
  it('should create a video and return rev and id', () => {
    return videoRepository
      .createEntity({
        title: 'test',
        url: 'testurl',
        watched: false,
        section: '123'
      })
      .then(res => {
        console.log(res);
        expect(res.id).toBeTruthy();
        return null;
      });
  });
});
