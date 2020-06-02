import * as actions from '../../app/actions/courses';

jest.mock('../../app/db/RepositoryInitializer', () => ({
  __esModule: true
}));
describe('actions', () => {
  it('should create new course', () => {
    expect(
      actions.addCourse({ id: '123', title: 'test', description: 'test' })
    ).toMatchSnapshot();
  });

  it('should remove course', () => {
    expect(actions.removeCourse('123')).toMatchSnapshot();
  });
});
