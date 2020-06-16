import * as actions from '../../app/actions/videos';

jest.mock('../../app/db/RepositoryInitializer', () => ({
  __esModule: true
}));
describe('actions', () => {
  it('should create new video', () => {
    expect(
      actions.addVideo({
        id: '456',
        title: 'test',
        section: '123',
        url: 'testurl',
        watched: false
      })
    ).toMatchSnapshot();
  });

  it('should update video', () => {
    expect(
      actions.updateVideo({
        id: '456',
        title: 'Changed',
        section: '123',
        url: 'testurl',
        watched: true
      })
    ).toMatchSnapshot();
  });

  it('should remove video', () => {
    expect(actions.removeVideo('456')).toMatchSnapshot();
  });
});
