import SectionRepository from '../../app/db/SectionRepository';
import { testdb, testrelDB } from './testdb';

describe('Test', () => {
  const sectionRepository = new SectionRepository(testdb, testrelDB);
  it('should create a section and return rev and id', () => {
    return sectionRepository
      .createEntity({ title: 'test', course: '123' })
      .then(res => {
        console.log(res);
        expect(res.id).toBeTruthy();
        return null;
      });
  });
});
